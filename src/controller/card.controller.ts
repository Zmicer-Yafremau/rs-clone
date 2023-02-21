import { Model } from '../model';
import { ICard, ICardReq } from '../types/requestTypes';

export class CardController {
    constructor(private model: Model) {}
    async getCard(id: number): Promise<ICardReq[] | undefined> {
        const Cards = this.model.cardModel;
        const result = await Cards.getCardsOfBox(id);
        return result;
    }
    async updateCard(id: number, obj: Partial<ICard>): Promise<ICardReq> {
        const Cards = this.model.cardModel;
        const result = await Cards.update(id, obj);
        return result;
    }
    async deleteCard(id: number): Promise<Response> {
        const Cards = this.model.cardModel;
        try {
            const result = await Cards.delete(id);
            return result;
        } catch (e) {
            console.log(e);
        }
    }
}
