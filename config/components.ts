import IComponentDefinition from '../src/Interface/IComponentDefinition';
import HomePage from '../src/Components/HomePage';
import NavBar from '../src/Components/NavBar';
import AboutPage from '../src/Components/AboutPage';
import TemplateComponent from '../src/Components/TemplateComponent';
import PageNotFoundComponent from '../src/Components/PageNotFoundComponent';
import ProfileComponent from '../src/Components/ProfileComponent';

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
        tag: 'about-page',
        component: AboutPage
    },
    {
        tag: 'tpl-component',
        component: TemplateComponent,
    },
    {
        tag: 'page-not-found',
        component: PageNotFoundComponent,
    },
    {
        tag: 'profile-component',
        component: ProfileComponent,
    }
];

export default components;