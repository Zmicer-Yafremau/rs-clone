import { Model } from '../model';
import { ICardReq } from '../types/requestTypes';

export class CardController {
    constructor(private model: Model) {}
    async getCard(id: number): Promise<ICardReq[] | undefined> {
        const Cards = this.model.cardModel;
        const result = await Cards.getCardsOfBox(id);
        return result;
    }
}
