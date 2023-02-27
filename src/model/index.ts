import { Observer } from '../utils/observer';
import { Box } from './box';
import { RouterModel } from './router.model';
import { Feedback } from './feedback';
import { UserBoxes } from './userBoxes';
import { Card } from './card';
export class Model extends Observer {
    routerModel: RouterModel;
    userBoxesModel: UserBoxes;
    boxModel: Box;
    feedback: Feedback;
    cardModel: Card;
    constructor() {
        super();
        this.routerModel = new RouterModel();
        this.userBoxesModel = new UserBoxes();
        this.boxModel = new Box();
        this.feedback = new Feedback();
        this.cardModel = new Card();
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

    async getByUser(id: number) {
        return await this.feedback.getByUser(id);
    }

    async getAll() {
        return await this.feedback.getAll();
    }
}
