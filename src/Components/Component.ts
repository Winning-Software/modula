export default abstract class Component<T = {}> extends HTMLElement
{
    public props: T;
    public isPageComponent: boolean = false;
    public isTemplateComponent: boolean = false;
    protected params: { [key: string]: string };
    protected data: any = null;

    /**
     * Called each time a component is mounted to the DOM
     *
     * @returns {void}
     */
    connectedCallback(): void
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
    private render(): void
    {
        this.innerHTML = '';
        this.append(this.template());
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
            try {
                props[attr] = JSON.parse(this.getAttribute(attr) || '');
            } catch (e) {
                props[attr] = this.getAttribute(attr);
            }
        });

        this.props = props as T;
    }

    protected afterMount(): void
    {
        return;
    }
}