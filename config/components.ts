import IComponentDefinition from '../src/Interface/IComponentDefinition';
import HomePage from '../src/Components/HomePage';
import NavBar from '../src/Components/NavBar';
import TemplateComponent from '../src/Components/TemplateComponent';
import PageNotFoundComponent from '../src/Components/PageNotFoundComponent';

const components: IComponentDefinition[] = [
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
        tag: 'page-not-found',
        component: PageNotFoundComponent,
    },
];

export default components;