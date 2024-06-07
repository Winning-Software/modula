import routes from '../config/routes';
import Modula from './Core/Modula';
import TemplateComponent from './Components/TemplateComponent';

const app: Modula = new Modula({
    routes: routes,
    template: TemplateComponent,
});