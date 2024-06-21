export default class ApplicationStore
{
    private static store: { [key: string]: any } = {};

    private constructor() {}

    public static set(key: string, value: any): void
    {
        ApplicationStore.store[key] = value;
    }

    public static get(key: string): any
    {
        return ApplicationStore.store[key];
    }

    public static delete(key: string): void
    {
        delete ApplicationStore.store[key];
    }
}