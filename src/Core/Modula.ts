import IComponentDefinition from '../Interface/IComponentDefinition';
import IModulaOptions from '../Interface/IModulaOptions';
import Component from '../Components/Component';
import Router from './Router';
import IRoute from '../Interface/IRoute';

export default class Modula
{
    private root: HTMLElement;
    private router: Router;
    private template: Component;
    private components: IComponentDefinition[] = [];

    constructor(options: IModulaOptions = {})
    {
        this.setup(options);
        this.goToPage(location.pathname, false);
    }

    private setup(options: IModulaOptions)
    {
        this.createRoot();
        this.registerComponents(options.components ?? []);

        if (options.template !== undefined) {
            this.template = document.createElement(this.findComponentTag(options.template)) as Component;
            this.root.append(this.template);
        }

        this.registerRoutes(options.routes ?? []);

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

    public findComponentTag(component: { new (): Component }): string
    {
        const componentDefinition: IComponentDefinition = this.components.find((definedComponent: IComponentDefinition) => {
            return component === definedComponent.component;
        });

        return componentDefinition?.tag;
    }

    public getContainer(): HTMLElement
    {
        return this.template ?? this.root;
    }
}