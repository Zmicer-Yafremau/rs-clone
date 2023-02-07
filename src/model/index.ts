import { Observer } from '../utils/observer';
import { RouterModel } from './router.model';
export class Model extends Observer {
    routerModel: RouterModel;

    constructor() {
        super();
        this.routerModel = new RouterModel();
    }

    setRoute(route: string, noEmit = false) {
        this.routerModel.setRoute(route);
        if (!noEmit) this.emit('route');
    }

    get route() {
        return this.routerModel.route;
    }
}
