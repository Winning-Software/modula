export default abstract class Component<T = {}> extends HTMLElement
{
    public props: T;
    public isPageComponent: boolean = false;
    public isTemplateComponent: boolean = false;
    protected params: { [key: string]: string };
    protected data: any = null;
    protected namedSlot?: string|null = null;

    /**
     * Called each time a component is mounted to the DOM
     *
     * @returns {void}
     */
    connectedCallback(): void
    {
        this.update();
    }

    public update()
    {
        if (!this.props) this.setPropsFromAttributes();

        if (!this.isPageComponent && !this.isTemplateComponent) {
            this.render();
        }

        this.fetchData().then(data => {
            this.data = data;
            this.render();
            this.afterMount();

            this.dispatchEvent(new CustomEvent('componentRendered', {
                detail: {
                    target: this
                }
            }));
        });
    }

    /**
     * Set when accessing a dynamic route.
     *
     * @param params {{[key: string]: string}}
     */
    public setParams(params: { [key: string]: string }): void
    {
        this.params = params;
    }

    /**
     * Renders the template contents.
     *
     * @returns {void}
     */
    protected render(): void
    {
        const template: HTMLElement = this.template();
        const slot: HTMLSlotElement = template.querySelector('slot');

        if (slot && this.namedSlot && slot.name === this.namedSlot) {
            const slotElements = this.querySelectorAll(`[slot="${this.namedSlot}"]`);

            slotElements.forEach(el => {
                template.querySelector('slot').append(el);
            });
        }

        this.innerHTML = '';
        this.appendChild(template);
        this.dispatchEvent(new CustomEvent('componentRendered', {
            detail: {
                target: this
            }
        }));
    }

    protected async fetchData(): Promise<any>
    {
        return true;
    }

    protected abstract template(): HTMLElement;

    private setPropsFromAttributes(): void
    {
        const attrs: string[] = this.getAttributeNames();
        const props: any = {};

        attrs.forEach((attr: string) => {
            const camelCaseAttr = attr.split('-').map((part, index) => {
                return index === 0 ? part.toLowerCase() : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
            }).join('');

            const attrValue = this.getAttribute(attr);

            try {
                props[camelCaseAttr] = JSON.parse(attrValue || '');
            } catch (e) {
                props[camelCaseAttr] = attrValue;
            }
        });

        this.props = props as T;
    }

    protected afterMount(): void
    {
        return;
    }
}