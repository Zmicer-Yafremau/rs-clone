import { Observer } from '../utils/observer';
import { Box } from './box';
import { RouterModel } from './router.model';
import { UserBoxes } from './userBoxes';
export class Model extends Observer {
    routerModel: RouterModel;
    userBoxesModel: UserBoxes;
    boxModel: Box;

    constructor() {
        super();
        this.routerModel = new RouterModel();
        this.userBoxesModel = new UserBoxes();
        this.boxModel = new Box();
    }

    setRoute(route: string, noEmit = false) {
        this.routerModel.setRoute(route);
        if (!noEmit) this.emit('route');
    }

    get route() {
        return this.routerModel.route;
    }
}
