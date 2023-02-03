import { Model } from '../model/index';
import { RouterController } from './router.controller';

export class Controller {
    routerController: RouterController;

    constructor(private model: Model) {
        this.routerController = new RouterController(model);
    }

    route(route: string, event: Event | false = false) {
        this.routerController.route(route, event);
    }

    updateRoute(route: string) {
        this.routerController.updateRoute(route);
    }
}
