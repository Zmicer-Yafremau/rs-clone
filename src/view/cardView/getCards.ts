import { BoxView } from '../boxView';
import { Controller } from '../../controller';
import { Model } from '../../model';

export async function getCurrentBox(pathBox: string) {
    const model = new Model();
    const controller = new Controller(model);
    const main = document.querySelector('.main') as Element;
    const boxView = new BoxView(controller, model, main);
    return await boxView.getParticipants(pathBox);
}

export async function getCards(pathBox: string) {
    const model = new Model();
    const controller = new Controller(model);
    const main = document.querySelector('.main') as Element;
    const boxView = new BoxView(controller, model, main);
    const box = await boxView.getParticipants(pathBox);
    return box ? await boxView.getBoxCards(box.box_id) : [];
}
