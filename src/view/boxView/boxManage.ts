import { Controller } from '../../controller';
import { BoxesController } from '../../controller/boxes.controller';
import { CardController } from '../../controller/card.controller';
import { UserBoxesController } from '../../controller/user-boxes.controller';
import { IBoxReq, ICardReq } from '../../types/requestTypes';
import { mixArr } from '../../utils/utils';

export async function drawRandomCards(
    cards: ICardReq[] | undefined,
    box: IBoxReq | null | undefined,
    controller: Controller
) {
    const cardsId = cards?.map((card) => card.card_id);
    if (cardsId && cardsId.length >= 3 && box) {
        let mixedArr = mixArr(cardsId);
        let result = cardsId.some((id, i) => id === mixedArr[i]);
        while (result) {
            mixedArr = mixArr(cardsId);
            result = cardsId.some((id, i) => id === mixedArr[i]);
        }

        const cardWards = cardsId.map((item, i) => [item, mixedArr[i]]);
        const updateCards = await Promise.all(
            cardWards.map(async (cards) => await controller.cardController.updateCard(cards[0], { wardId: cards[1] }))
        );
        cards = updateCards;
        const updateBox = await controller.boxesController.updateBox(box.box_id, { isDraw: true });
        box = updateBox;
        controller.route(location.origin + `/box/${box.box_id}`);
        return { cards, box };
    }
}

export async function redrawRandomCards(
    cards: ICardReq[] | undefined,
    box: IBoxReq | null | undefined,
    controller: Controller
) {
    if (cards && box) {
        const updateCards = await Promise.all(
            cards.map(
                async (cards) =>
                    await controller.cardController.updateCard(cards.card_id, {
                        wardId: null,
                        cardGift: false,
                        wardGift: false,
                    })
            )
        );
        cards = updateCards;
        const updateBox = await controller.boxesController.updateBox(box.box_id, { isDraw: false });
        box = updateBox;
        controller.route(location.origin + `/box/${box.box_id}/edit`);
        return { cards, box };
    }
    return false;
}

export function getBoxName(name: string) {
    return name
        .split('=')[0]
        .split(' ')
        .map((item) => item[0].toUpperCase() + item.slice(1, item.length))
        .join('');
}
export async function deleteBox(
    cards: ICardReq[] | undefined,
    box: IBoxReq | null | undefined,
    controller: Controller,
    userId: number
) {
    if (cards && box) {
        await updateUserBoxes(userId, box.box_id, controller.userBoxesController);
        await Promise.all(
            cards.map(async (card) => {
                await updateUserBoxes(card.user_id, box.box_id, controller.userBoxesController);
            })
        );
        await Promise.all(cards.map(async (card) => await controller.cardController.deleteCard(card.card_id)));
        await controller.boxesController.deleteBox(box.box_id);
    }
}
async function updateUserBoxes(userId: number, boxId: number, controller: UserBoxesController) {
    const userBoxes = (await controller.getUserBoxes(userId))[0];
    const newBoxes = userBoxes.user_boxes.filter((id) => id !== boxId);
    await controller.updateUserBoxes(userBoxes.id, newBoxes, userBoxes.account_id);
}

export async function getParticipants(path: string, controller: BoxesController) {
    const allBoxesOfUser = await controller.getBoxes();
    const currentBoxId = Number(path);
    if (currentBoxId && allBoxesOfUser && allBoxesOfUser.length > 0) {
        const currentBox = allBoxesOfUser.find((box) => box.box_id === Number(currentBoxId));
        return currentBox ? currentBox : null;
    }
    return null;
}
export async function getBoxCards(id: number, controller: CardController) {
    const allCards = await controller.getCard(id);
    return allCards;
}
