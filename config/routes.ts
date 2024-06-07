import IRoute from '../src/Interface/IRoute';
import HomePage from '../src/Components/HomePage';
import AboutPage from "../src/Components/AboutPage";
import ProfileComponent from '../src/Components/ProfileComponent';

const routes: IRoute[] = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/about',
        component: AboutPage,
    },
    {
        path: '/profile/:user',
        component: ProfileComponent,
    }
];

export default routes;