import Component from './Component';
import html from '../Core/Template';

export default class PageNotFoundComponent extends Component
{
    template(): HTMLElement
    {
        return html`
            <main>
                <h1>Page Not Found</h1>
            </main>
        `;
    }
}