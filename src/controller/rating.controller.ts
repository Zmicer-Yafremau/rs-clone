import { Model } from '../model/index';

export class RatingController {
    constructor(private model: Model) {}

    async createFeedback(rating: number, text: string, userName: string, userId: number) {
        await this.model.createFeedback(rating, text, userName, userId);
    }

    async getAll() {
        return await this.model.getAll();
    }
}
