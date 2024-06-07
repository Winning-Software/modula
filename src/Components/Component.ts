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
        console.log(`Rendering ${this.constructor.name}`);
        this.append(this.template());
        console.log(this);
    }

    protected async fetchData(): Promise<any>
    {
        return true;
    }

    abstract template(): HTMLElement;
}