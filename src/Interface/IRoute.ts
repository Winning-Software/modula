import Component from '../Components/Component';

export default interface IRoute
{
    path: string;
    component: new () => Component;
    pattern?: RegExp;
    requireAuth?: boolean;
}