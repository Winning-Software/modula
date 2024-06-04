import IRoute from './IRoute';
import IComponentDefinition from './IComponentDefinition';

export default interface IModulaOptions
{
    routes?: IRoute[];
    components?: IComponentDefinition[];
}