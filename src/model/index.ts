import { Observer } from '../utils/observer';
import { RouterModel } from './router.model';
import { Feedback } from './feedback';
export class Model extends Observer {
    routerModel: RouterModel;
    feedback: Feedback;

    constructor() {
        super();
        this.routerModel = new RouterModel();
        this.feedback = new Feedback();
    }

    setRoute(route: string, noEmit = false) {
        this.routerModel.setRoute(route);
        if (!noEmit) this.emit('route');
    }

    get route() {
        return this.routerModel.route;
    }

    async createFeedback(rating: number, text: string, userName: string, userId: number) {
        await this.feedback.create(rating, text, userName, userId);
    }

    async getAll() {
        return await this.feedback.getAll();
    }
}
