import { TemplateComponent, html } from '../../src/modula';

export default class TestTemplate extends TemplateComponent
{
    protected template(): HTMLElement
    {
        return html`
            <div>My App</div>
            <slot></slot>
        `;
    }
}