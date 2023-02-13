import { Model } from '../../model/index';
import { Controller } from '../../controller';
import { boxImages } from '../../db/boxesImg';

export class BoxView {
    constructor(private controller: Controller, private model: Model, private root: Element) {}

    async getParticipants(path: string) {
        const allBoxesOfUser = await this.controller.boxesController.getBoxes();
        const currentBoxName = path.split('=')[0];
        const currentBoxId = path.split('=')[1];
        if (allBoxesOfUser && allBoxesOfUser.length > 0) {
            const currentBox = allBoxesOfUser.find(
                (box) =>
                    box.box_id === Number(currentBoxId) &&
                    box.box_name
                        .split('=')[0]
                        .split(' ')
                        .map((item) => item[0].toUpperCase() + item.slice(1, item.length))
                        .join('') === currentBoxName
            );
            return currentBox;
        }
        return null;
    }
    async render(path: string) {
        const box = await this.getParticipants(path);

        this.root.innerHTML = !box
            ? `<div class="box__not" >${boxImages['boxNotFound']}
            <div><p>Коробка не найдена</p><p>Похоже, вы перешли по неверной ссылке для коробки..</p></div>
            <button type="button" class="btn main__button bg-light active">
                            Вернуться на главную
                        </button></div>`
            : `<div class="box__view" >
            <div class="box__menu">Menu</div>
            <div class="box__cards center"></div>
            </div>`;
    }
    addListeners() {
        const buttonBack = document.querySelector('.box__not .main__button');
        if (buttonBack) {
            buttonBack.addEventListener('click', (e) => {
                this.controller.route(location.origin + '/');
            });
        }
    }
}
