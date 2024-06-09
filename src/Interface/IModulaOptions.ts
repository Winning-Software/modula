import IComponentDefinition from './IComponentDefinition';
import IRoute from './IRoute';
import Component from '../Components/Component';

export default interface IModulaOptions
{
    routes?: IRoute[];
    components?: IComponentDefinition[];
    template?: new () => Component;
    pageNotFound?: new () => Component;
}