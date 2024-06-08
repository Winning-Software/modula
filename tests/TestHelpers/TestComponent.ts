import {Component, html} from '../../src/modula';

export default class TestComponent extends Component
{
    template(): HTMLElement
    {
        return html`
            <div>
                <h1>Testing</h1>
                <p>This is a test component</p>
            </div>
        `;
    }
}