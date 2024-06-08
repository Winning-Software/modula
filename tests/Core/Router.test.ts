import Modula from '../../src/Core/Modula';
import TestComponent from '../TestHelpers/TestComponent';
import Router from '../../src/Core/Router';

const modula: Modula = new Modula({
    routes: [
        {
            path: '/',
            component: TestComponent
        },
    ],
    components: [
        {
            tag: 'test-component',
            component: TestComponent
        },
    ]
});

beforeEach(() => {
    modula.getContainer().innerHTML = '';
});

describe('Class: Router', () => {
    it('should create an instance of router', () => {
        expect(new Router(modula)).toBeInstanceOf(Router);
    });

    it('should render the index route', () => {
        expect(document.body.innerHTML).toBe('<div id="root"></div>');

        modula.goToPage('/');

        expect(document.body.innerHTML).toContain('<test-component>');
    });
});