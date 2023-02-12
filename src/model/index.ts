import { Observer } from '../utils/observer';
import { Box } from './box';
import { RouterModel } from './router.model';
import { Feedback } from './feedback';
import { UserBoxes } from './userBoxes';
export class Model extends Observer {
    routerModel: RouterModel;
    userBoxesModel: UserBoxes;
    boxModel: Box;
    feedback: Feedback;
    constructor() {
        super();
        this.routerModel = new RouterModel();
        this.userBoxesModel = new UserBoxes();
        this.boxModel = new Box();
        this.feedback = new Feedback();
    }

    setRoute(route: string, noEmit = false) {
        this.routerModel.setRoute(route);
        if (!noEmit) this.emit('route');
    }

    get route() {
        return this.routerModel.route;
    }

    async createFeedback(rating: number, text: string, userName: string, userId: number | null) {
        return await this.feedback.create(rating, text, userName, userId);
    }

    async getAll() {
        return await this.feedback.getAll();
    }
}
