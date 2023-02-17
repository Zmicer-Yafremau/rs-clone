import { Model } from '../../model/index';
import { Controller } from '../../controller';
import { getCards } from '../cardView/getCards';
import { drawBoxTitle } from '../boxView/boxTitle';

export class EditCardView {
    constructor(private controller: Controller, private model: Model, private root: Element) {}

    async render(path: string) {
        const userId = localStorage.getItem('id');
        const cards = await getCards(path);
        const cardId = cards?.find((card) => card.user_id === Number(userId));
    }
}
