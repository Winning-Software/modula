import Modula from '../../src/Core/Modula';
import TestComponent from '../TestHelpers/TestComponent';

new Modula({
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
    document.body.innerHTML = '';
});

describe('Class: Component', () => {
    it('should create a new HTMLElement', () => {
        expect(getTestComponent()).toBeInstanceOf(HTMLElement);
    });

    it('should contain template tag', () => {
        expect(getTestComponent().outerHTML).toContain('<test-component>');
    });

    it('should render to the DOM', () => {
        document.body.append(getTestComponent());

        expect(document.body.innerHTML).toContain('<test-component>');
        expect(document.body.innerHTML).toContain('<h1>Testing</h1>');
    });

    it('should render by tag', () => {
        document.body.innerHTML = '<test-component></test-component>';

        expect(document.body.innerHTML).toContain('<test-component>');
        expect(document.body.innerHTML).toContain('<h1>Testing</h1>');
    });
});

function getTestComponent(): TestComponent
{
    return document.createElement('test-component') as TestComponent;
}