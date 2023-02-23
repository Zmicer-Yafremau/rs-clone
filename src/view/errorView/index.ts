import { Model } from '../../model/index';
import { Controller } from '../../controller';
import { errorCats } from '../../db/errorCats';

export class ErrorView {
    constructor(private controller: Controller, private model: Model, private root: Element) {}

    render() {
        this.root.innerHTML = `<div class="box__not" >${errorCats.boxNotFound}
        <div><p>Упс....</p><p>Похоже, вы перешли по неверной ссылке, возвращайтесь домой...</p></div>
        <button id="back" type="button" class="btn main__button bg-light active">
                        Вернуться на главную
                    </button></div>`;
        this.addListeners();
    }
    addListeners() {
        const buttonBack = document.querySelector('#back');
        if (buttonBack) {
            buttonBack.addEventListener('click', () => {
                this.controller.route(location.origin + '/');
            });
        }
    }
}
