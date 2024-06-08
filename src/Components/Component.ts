export default abstract class Component<T = {}> extends HTMLElement
{
    public props: T;
    protected params: { [key: string]: string };
    protected data: any = null;

    /**
     * Called each time a component is mounted to the DOM
     *
     * @returns {void}
     */
    connectedCallback(): void
    {
        this.setPropsFromAttributes();
        this.render();

        this.fetchData().then(data => {
            this.data = data;
            this.render();
            this.dispatchEvent(new CustomEvent('componentRendered'));
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
    private render(): void
    {
        this.innerHTML = '';
        this.append(this.template());
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
            try {
                props[attr] = JSON.parse(this.getAttribute(attr) || '');
            } catch (e) {
                props[attr] = this.getAttribute(attr);
            }
        });

        this.props = props as T;
    }
}