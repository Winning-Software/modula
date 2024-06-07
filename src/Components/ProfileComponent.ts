import Component from './Component';
import html from '../Core/Template';

export default class ProfileComponent extends Component
{
    protected async fetchData(): Promise<any> {
        const userData = [
            {
                id: '1',
                name: 'Daniel Winning',
            },
            {
                id: '2',
                name: 'Thea Winning',
            }
        ];

        const user = userData.find(user => user.id === this.params.user);

        return Promise.resolve({user: user});
    }

    template(): HTMLElement
    {
        return html`
            <div>
                <p>Welcome back, ${this.data.user.name}</p>
            </div>
        `;
    }
}