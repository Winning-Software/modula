import Component from '../Components/Component';

export default interface IComponentDefinition
{
    tag: string;
    component: new () => Component;
}