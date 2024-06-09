import { html, Component } from '../../src/modula';

export default class DynamicRouteComponent extends Component
{
    protected template(): HTMLElement
    {
        return html`
            <h1>${this.params.userId}</h1>
        `;
    }
}