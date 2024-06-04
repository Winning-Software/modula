import components from '../config/components';
import routes from '../config/routes';
import Modula from './Core/Modula';
import TemplateComponent from './Components/TemplateComponent';

const app: Modula = new Modula({
    components: components,
    routes: routes,
    template: TemplateComponent,
});