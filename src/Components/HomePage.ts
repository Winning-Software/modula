import Component from './Component';
import html from '../Core/Template';

export default class HomePage extends Component
{
    static tagName: string = 'home-page';

    template(): HTMLElement
    {
        return html`
            <div>
                <h1>Home Page</h1>
            </div>
        `;
    }
}