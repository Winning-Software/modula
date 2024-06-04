import Component from './Component';
import html from '../Core/Template';

export default class AboutPage extends Component
{
    template(): HTMLElement
    {
        return html`
            <div>
                <h1>
                    About Page
                </h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci id ipsa iste 
                    natus sit?
                </p>
            </div>
        `;
    }
}