import Modula from '../../src/Core/Modula';
import TestComponent from '../TestHelpers/TestComponent';
import Router from '../../src/Core/Router';
import TestTemplate from '../TestHelpers/TestTemplate';
import DynamicRouteComponent from '../TestHelpers/DynamicRouteComponent';

const routes = [
    {
        path: '/',
        component: TestComponent
    },
    {
        path: '/user/:userId',
        component: DynamicRouteComponent
    }
];
const testComponents = [
    {
        tag: 'test-component',
        component: TestComponent
    },
    {
        tag: 'test-template',
        component: TestTemplate
    },
    {
        tag: 'dynamic-test',
        component: DynamicRouteComponent
    }
]
const modula: Modula = new Modula({
    routes: routes,
    components: testComponents,
    template: TestTemplate
});

beforeEach(() => {
    modula.getContainer().innerHTML = '';
});

describe('Class: Router', () => {
    it('should create an instance of router', () => {
        expect(new Router(modula)).toBeInstanceOf(Router);
    });

    it('should render the index route', () => {
        expect(document.body.innerHTML)
            .toBe('<div id="root"><test-template></test-template></div>');

        modula.goToPage('/');

        expect(document.body.innerHTML).toContain('<test-component>');
    });

    it('should render page not found component', () => {
        expect(document.body.innerHTML)
            .toBe('<div id="root"><test-template></test-template></div>');

        modula.goToPage('/route-not-defined');

        expect(document.body.innerHTML).toContain('<modula-page-not-found>');
    });

    it('should render a dynamic route', () => {
        expect(document.body.innerHTML)
            .toBe('<div id="root"><test-template></test-template></div>');

        modula.goToPage('/user/1');

        expect(document.body.innerHTML).toContain('<h1>1</h1>');
    })
});