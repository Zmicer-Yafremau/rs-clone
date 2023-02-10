import { Model } from '../model/index';
import { RouterController } from './router.controller';
import { RatingController } from './rating.controller';

export class Controller {
    routerController: RouterController;
    ratingController: RatingController;

    constructor(private model: Model) {
        this.routerController = new RouterController(model);
        this.ratingController = new RatingController(model);
    }

    route(route: string, event: Event | false = false) {
        this.routerController.route(route, event);
    }

    updateRoute(route: string) {
        this.routerController.updateRoute(route);
    }

    async createFeedback(rating: number, text: string, userName: string, userId: number) {
        await this.ratingController.createFeedback(rating, text, userName, userId);
    }

    async getAll() {
        return await this.ratingController.getAll();
    }
}
