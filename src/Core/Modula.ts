import bundledComponents from '../../config/components';
import Component from '../Components/Component';
import IComponentDefinition from '../Interface/IComponentDefinition';
import IModulaOptions from '../Interface/IModulaOptions';
import IRoute from '../Interface/IRoute';
import ModulaPageNotFound from '../Components/ModulaPageNotFound';
import Router from './Router';

export default class Modula
{
    private root: HTMLElement;
    private router: Router;
    private template: Component;
    private components: IComponentDefinition[] = [];
    private pageNotFound: new () => Component;
    private authRedirectPath: string;
    private userProp: string;

    constructor(options: IModulaOptions = {})
    {
        this.setup(options);
    }

    private setup(options: IModulaOptions): void
    {
        this.createRoot();
        this.registerComponents(bundledComponents);
        this.registerComponents(options.components ?? []);
        this.registerRoutes(options.routes ?? []);

        if (options.pageNotFound !== undefined) {
            this.pageNotFound = options.pageNotFound;
        }

        this.authRedirectPath = options.authRedirectPath !== undefined
            ? options.authRedirectPath
            : '/login';

        this.userProp = options.userProp !== undefined
            ? options.userProp
            : 'user';

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
                const target: HTMLAnchorElement = event.target as HTMLAnchorElement;

                if (target.host === window.location.host) {
                    event.preventDefault();

                    this.goToPage(target.pathname);
                }
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

    public getAuthRedirectPath(): string
    {
        return this.authRedirectPath;
    }

    public getUserProp(): string
    {
        return this.userProp;
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
     * Instantiates and returns the 404 component. You should't ever need to call this yourself,
     * it is called within the internal routing system.
     *
     * @returns {Component}
     */
    public getPageNotFoundComponent(): Component
    {
        return document.createElement(this.findComponentTag(this.pageNotFound ?? ModulaPageNotFound)) as Component;
    }

    /**
     * Returns the app container element.
     *
     * @returns {HTMLElement}
     */
    public getContainer(): HTMLElement
    {
        return this.template ?? this.root;
    }
}