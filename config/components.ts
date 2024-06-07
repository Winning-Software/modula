import IComponentDefinition from '../src/Interface/IComponentDefinition';
import HomePage from '../src/Components/HomePage';
import NavBar from '../src/Components/NavBar';
import TemplateComponent from '../src/Components/TemplateComponent';
import ModulaPageNotFound from '../src/Components/ModulaPageNotFound';

const bundledComponents: IComponentDefinition[] = [
    {
        tag: 'home-page',
        component: HomePage,
    },
    {
        tag: 'nav-bar',
        component: NavBar,
    },
    {
        tag: 'tpl-component',
        component: TemplateComponent,
    },
    {
        tag: 'modula-page-not-found',
        component: ModulaPageNotFound,
    },
];

export default bundledComponents;