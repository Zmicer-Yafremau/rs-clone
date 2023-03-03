import { Model } from '../../model/index';
import { Controller } from '../../controller';
import { addBoxPics } from './add-box-pics';
import { checkNewBox } from '../../controller/check-new-box';
export class NewBoxView {
    constructor(private controller: Controller, private model: Model, private root: Element) {}

    render() {
        this.root.innerHTML = `<div class="box">
        <div class="box__wrapper">
        <div class="box__container container screenshot__container shadow-lg bg-body-tertiary rounded">
        <form class="box__form" novalidate>    
        <div class="screenshot__header">
                <h4 class="center">Создать коробку</h4>
            </div>
            <div class="screenshot__body">
                <div class="screenshot__limit">
                    <div class="col">
                    <label for="boxInput"
                        class="form-label fw-lighter">Название коробки:</label>
                    <input type="text" class="form-control bg-light"
                        id="boxInput" placeholder="" minsize="1" required>
                        <div class="invalid-feedback">
                        Пожалуйста, введите имя коробки .
                      </div>
                      <div class="box__err authorization__errors text-center mt-4 visually-hidden">
                      Пожалуйста, выберите картинку.
                   </div>
                </div>
                </div>
                <div class="box__pictures center flex-wrap p-3">


                </div>
            </div>

            <div class="screenshot__footer center">
                        <button type="submit" class="btn box__sub-btn main__button active">Создать</button>

            </div>
        </div>
        </form>
        </div>
        </div>`;
        addBoxPics();
    }
    addListeners() {
        const FORM = document.getElementsByClassName('box__form')[0] as HTMLFormElement;
        const BOX_PICTURES = document.getElementsByClassName('box__pictures')[0] as HTMLDivElement;
        BOX_PICTURES.addEventListener('click', (event) => {
            const DIV = (event.target as HTMLElement).closest('div') as HTMLDivElement;
            if (DIV.classList.contains('box__svg')) {
                Array.from(BOX_PICTURES.children).forEach((el) => {
                    if (el !== DIV) el.classList.remove('active');
                });
                DIV.classList.toggle('active');
            }
        });
        checkNewBox(FORM, BOX_PICTURES, this.controller, this.model);
    }
}
