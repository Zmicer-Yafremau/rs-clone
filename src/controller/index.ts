import { Model } from '../model/index';
import { BoxesController } from './boxes.controller';
import { RouterController } from './router.controller';
import { RatingController } from './rating.controller';
import { CardController } from './card.controller';
import { UserBoxesController } from './user-boxes.controller';

export class Controller {
    routerController: RouterController;
    ratingController: RatingController;
    boxesController: BoxesController;
    cardController: CardController;
    userBoxesController: UserBoxesController;
    constructor(private model: Model) {
        this.routerController = new RouterController(model);
        this.boxesController = new BoxesController(model);
        this.ratingController = new RatingController(model);
        this.cardController = new CardController(model);
        this.userBoxesController = new UserBoxesController(model);
    }

    route(route: string, event: Event | false = false) {
        this.routerController.route(route, event);
    }

    updateRoute(route: string) {
        this.routerController.updateRoute(route);
    }

    async createFeedback(rating: number, text: string, userName: string, userId: number | null) {
        return await this.ratingController.createFeedback(rating, text, userName, userId);
    }

    async getAll() {
        return await this.ratingController.getAll();
    }
}
