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
            <slot></slot>
            <footer></footer>
        `;
    }
}