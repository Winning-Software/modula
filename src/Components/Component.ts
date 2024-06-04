export default abstract class Component extends HTMLElement
{
    static tagName: string;

    connectedCallback(): void
    {
        this.render();
    }

    private render(): void
    {
        this.append(this.template());
    }

    abstract template(): HTMLElement;
}