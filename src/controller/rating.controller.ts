import { Model } from '../model/index';

export class RatingController {
    constructor(private model: Model) {}

    async createFeedback(rating: number, text: string, userName: string, userId: number | null) {
        return await this.model.createFeedback(rating, text, userName, userId);
    }

    async getByUser(id: number) {
        return await this.model.getByUser(id);
    }


    async getAll() {
        return await this.model.getAll();
    }
}
