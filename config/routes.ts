import IRoute from '../src/Interface/IRoute';
import HomePage from '../src/Components/HomePage';
import AboutPage from "../src/Components/AboutPage";

const routes: IRoute[] = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/about',
        component: AboutPage,
    }
];

export default routes;