import IRoute from '../Interface/IRoute';
import Component from '../Components/Component';
import Modula from './Modula';
import ApplicationStore from './ApplicationStore';

export default class Router
{
    private routes: IRoute[] = [];
    private app: Modula;

    constructor(app: Modula)
    {
        this.app = app;

        window.addEventListener('popstate', (event: PopStateEvent) => {
            this.loadRoute(location.pathname);
        });
    }

    public addRoute(route: IRoute): void
    {
        route.pattern = new RegExp('^' + route.path.replace(/:\w+/g, '([^/]+)') + '$');

        this.routes.push(route);
    }

    public navigate(path: string, pushState: boolean = true): void
    {
        const route = this.routes.find(route => route.pattern.test(path));

        if (route && route.requireAuth && !this.isUserAuthenticated()) {
            path = this.app.getAuthRedirectPath();
        }

        if (pushState) {
            history.pushState({}, '', path);
        }

        this.loadRoute(path);
    }

    private loadRoute(path: string): void
    {
        for (const route of this.routes) {
            const match = path.match(route.pattern);

            if (!match) continue;

            const component: Component = document.createElement(this.app.findComponentTag(route.component)) as Component;
            const params = this.extractParams(route, match);

            component.setParams(params);

            this.mountComponent(component);

            return;
        }

        this.mountComponent(this.app.getPageNotFoundComponent());
    }

    private mountComponent(component: Component): void
    {
        const slot: HTMLSlotElement = this.app.getContainer().querySelector('slot');

        if (slot) {
            slot.innerHTML = '';
            slot.append(component);
        } else {
            this.app.getContainer().innerHTML = '';
            this.app.getContainer().append(component);
        }
    }

    private extractParams(route: IRoute, match: RegExpMatchArray): { [key: string]: string }
    {
        const keys: string[] = route.path.match(/:(\w+)/g) || [];
        const values = match.slice(1);
        const params: { [key: string]: string } = {};

        keys.forEach((key, i) => {
            params[key.slice(1)] = values[i];
        });

        return params;
    }

    private isUserAuthenticated(): boolean
    {
        if (ApplicationStore.get(this.app.getUserProp()) === undefined) {
            return false;
        }

        return ApplicationStore.get(this.app.getUserProp()) !== null;
    }
}