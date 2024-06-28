import bundledComponents from '../../config/components';
import Component from '../Components/Component';
import IComponentDefinition from '../Interface/IComponentDefinition';
import IModulaOptions from '../Interface/IModulaOptions';
import IRoute from '../Interface/IRoute';
import ModulaPageNotFound from '../Components/ModulaPageNotFound';
import Router from './Router';
import ApplicationStore from './ApplicationStore';

export default class Modula
{
    private root: HTMLElement;
    private router: Router;
    private template: Component;
    private guestTemplate: Component;
    private components: IComponentDefinition[] = [];
    private pageNotFound: new () => Component;
    private authRedirectPath: string;
    private userProp: string;

    constructor(options: IModulaOptions = {})
    {
        this.setup(options).then();
    }

    private async setup(options: IModulaOptions): Promise<void>
    {
        this.createRoot();
        await this.registerComponents(bundledComponents);
        await this.registerComponents(options.components ?? []);
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

        if (options.guestTemplate !== undefined) {
            this.guestTemplate = document.createElement(this.findComponentTag(options.guestTemplate)) as Component;
            this.guestTemplate.addEventListener('componentRendered', (event: CustomEvent) => {
                const component: Component = event.detail.target;

                if (!component.isPageComponent && !component.isTemplateComponent) return;

                this.goToPage(location.pathname);
            })
        }

        if (options.template !== undefined) {
            this.template = document.createElement(this.findComponentTag(options.template)) as Component;

            if (this.guestTemplate && !ApplicationStore.get(this.userProp)) {
                this.root.append(this.guestTemplate);
            } else {
                this.root.append(this.template);
            }

            this.template.addEventListener('componentRendered', (event: CustomEvent) => {
                const component: Component = event.detail.target;

                if (!component.isPageComponent && !component.isTemplateComponent) return;

                this.goToPage(location.pathname);
            });
        } else {
            this.goToPage(location.pathname, false);
        }

        document.addEventListener('click', (event: MouseEvent) => {
            const eventTarget: HTMLElement = event.target as HTMLElement;
            const anchorElement = eventTarget.closest('a');

            if (anchorElement && anchorElement.host === window.location.host) {
                event.preventDefault();

                this.goToPage(anchorElement.pathname);
            }
        });
    }

    private createRoot(): void
    {
        this.root = document.createElement('div');
        this.root.id = 'root';
        document.body.append(this.root);
    }

    private async registerComponents(components: IComponentDefinition[]): Promise<void>
    {
        for (const component of components) {
            customElements.define(component.tag, component.component);
            this.components.push(component);
            await customElements.whenDefined(component.tag);
        }
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
        if (this.guestTemplate && !ApplicationStore.get(this.userProp)) {
            return this,this.guestTemplate;
        }

        return this.template ?? this.root;
    }
}