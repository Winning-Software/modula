import IRoute from './IRoute';
import IComponentDefinition from './IComponentDefinition';
import Component from '../Components/Component';

export default interface IModulaOptions
{
    routes?: IRoute[];
    components?: IComponentDefinition[];
    template?: new () => Component;
}