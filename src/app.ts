import components from '../config/components';
import IModulaOptions from './Interface/IModulaOptions';
import IComponentDefinition from './Interface/IComponentDefinition';

class Modula
{
    constructor(options: IModulaOptions = {}) {
        this.setup(options);
    }

    private setup(options: IModulaOptions) {
         this.registerComponents(options);
    }

    private registerComponents(options: IModulaOptions) {
        if (options.components !== undefined) {
            options.components.forEach((component: IComponentDefinition) => {
                customElements.define(component.tag, component.component);
            });
        }
    }
}

const app: Modula = new Modula({
    components: components,
});

document.body.append(document.createElement('home-page'));