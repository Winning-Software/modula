import bundledComponents from '../../config/components';
import IComponentDefinition from '../Interface/IComponentDefinition';
import IModulaOptions from '../Interface/IModulaOptions';
import Component from '../Components/Component';
import Router from './Router';
import IRoute from '../Interface/IRoute';
import ModulaPageNotFound from '../Components/ModulaPageNotFound';

export default class Modula
{
    private root: HTMLElement;
    private router: Router;
    private template: Component;
    private components: IComponentDefinition[] = [];
    private pageNotFound: new () => Component;

    constructor(options: IModulaOptions = {})
    {
        this.setup(options);
    }

    private setup(options: IModulaOptions)
    {
        this.createRoot();
        this.registerComponents(bundledComponents);
        this.registerComponents(options.components ?? []);
        this.registerRoutes(options.routes ?? []);

        if (options.pageNotFound !== undefined) {
            this.pageNotFound = options.pageNotFound;
        }

        if (options.template !== undefined) {
            this.template = document.createElement(this.findComponentTag(options.template)) as Component;
            this.root.append(this.template);

            this.template.addEventListener('componentRendered', (event: CustomEvent) => {
                const component: Component = event.detail.target;

                if (!component.isPageComponent && !component.isTemplateComponent) return;

                this.goToPage(location.pathname);
            });
        } else {
            this.goToPage(location.pathname, false);
        }

        document.addEventListener('click', (event: MouseEvent) => {
            if (event.target.constructor.name === 'HTMLAnchorElement') {
                event.preventDefault();

                const target: HTMLAnchorElement = event.target as HTMLAnchorElement;

                this.goToPage(target.pathname);
            }
        });
    }

    private createRoot(): void
    {
        this.root = document.createElement('div');
        this.root.id = 'root';
        document.body.append(this.root);
    }

    private registerComponents(components: IComponentDefinition[]): void
    {
        components.forEach((component: IComponentDefinition) => {
            customElements.define(component.tag, component.component);
            this.components.push(component);
        });
    }

    private registerRoutes(routes: IRoute[]): void
    {
        this.router = new Router(this);

        routes.forEach((route: IRoute) => {
            this.router.addRoute(route);
        });
    }

    public goToPage(path: string, pushState: boolean = true): void
    {
        this.router.navigate(path, pushState);
    }

    /**
     * Returns the tag name for the given Component.
     *
     * @param {new () => Component} component
     *
     * @returns {string}
     */
    public findComponentTag(component: { new (): Component }): string
    {
        const componentDefinition: IComponentDefinition = this.components.find((definedComponent: IComponentDefinition) => {
            return component === definedComponent.component;
        });

        return componentDefinition?.tag;
    }

    /**
     * Instantiates and returns the 404 component.
     *
     * @returns {Component}
     */
    public getPageNotFoundComponent(): Component
    {
        return document.createElement(this.findComponentTag(this.pageNotFound ?? ModulaPageNotFound)) as Component;
    }

    public getContainer(): HTMLElement
    {
        return this.template ?? this.root;
    }
}