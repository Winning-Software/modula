import Component from './Component';
import html from '../Core/Template';

export default class TemplateComponent extends Component
{
    template(): HTMLElement
    {
        return html`
            <header>
                <h1>My App</h1>
                <nav-bar></nav-bar>
            </header>
            <main>
                <slot></slot>
            </main>
            <footer>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, rem!</p>
            </footer>
        `;
    }
}