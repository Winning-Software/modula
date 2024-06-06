export default abstract class Component<T = {}> extends HTMLElement
{
    public props: T;

    /**
     * Called each time a component is mounted to the DOM
     *
     * @returns {void}
     */
    connectedCallback(): void
    {
        this.render();
    }

    /**
     * Renders the template contents.
     *
     * @returns {void}
     */
    private render(): void
    {
        this.append(this.template());
    }

    abstract template(): HTMLElement;
}