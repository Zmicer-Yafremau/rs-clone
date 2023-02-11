import { Model } from '../model/index';
import { BoxesController } from './boxes.controller';
import { RouterController } from './router.controller';

export class Controller {
    routerController: RouterController;
    boxesController: BoxesController;
    constructor(private model: Model) {
        this.routerController = new RouterController(model);
        this.boxesController = new BoxesController(model);
    }

    route(route: string, event: Event | false = false) {
        this.routerController.route(route, event);
    }

    updateRoute(route: string) {
        this.routerController.updateRoute(route);
    }
}
