import IRoute from '../Interface/IRoute';
import Modula from './Modula';
import Component from '../Components/Component';

export default class Router
{
    private routes: IRoute[] = [];
    private app: Modula;

    constructor(app: Modula)
    {
        this.app = app;
    }

    public addRoute(route: IRoute): void
    {
        route.pattern = new RegExp('^' + route.path.replace(/:\w+/g, '([^/]+)') + '$');

        this.routes.push(route);
    }

    public navigate(path: string, pushState: boolean = true)
    {
        if (pushState) {
            history.pushState({}, '', path);
        }

        this.loadRoute(path);
    }

    private loadRoute(path: string)
    {
        for (const route of this.routes) {
            const match = path.match(route.pattern);

            if (!match) continue;

            console.log(`Matched route ${route.path}`);

            const component: Component = document.createElement(this.app.findComponentTag(route.component)) as Component;
            const slot: HTMLSlotElement = this.app.getContainer().querySelector('slot');

            if (slot) {
                slot.innerHTML = '';
                slot.append(component);
            } else {
                this.app.getContainer().innerHTML = '';
                this.app.getContainer().append(component);
            }

            return;
        }

        // Handle 404
    }
}