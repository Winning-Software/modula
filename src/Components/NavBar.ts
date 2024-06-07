import Component from './Component';
import html from '../Core/Template';

export default class NavBar extends Component
{
    template(): HTMLElement
    {
        return html`
            <nav>
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                </ul>
            </nav>
        `;
    }
}