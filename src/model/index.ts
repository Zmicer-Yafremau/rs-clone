import { RouterModel } from './router.model';
export class Model {
    routerModel: RouterModel;

    constructor() {
        this.routerModel = new RouterModel();
    }

    setRoute(route: string) {
        this.routerModel.setRoute(route);
    }

    get route() {
        return this.routerModel.route;
    }
}
