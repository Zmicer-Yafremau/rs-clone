import { Model } from '../../model/index';
import { Controller } from '../../controller';
import { addUsrPics } from '../newBoxView/add-usr-pics';
import { checkNewCard } from '../../controller/check-card-validation';
export class NewCardView {
    constructor(private controller: Controller, private model: Model, private root: Element) {}

    render() {
        this.root.innerHTML = `<div class="box ucard">
        <div class="box__wrapper">
        <div class="box__container container screenshot__container shadow-lg bg-body-tertiary rounded">
    <form class="ucard__form" novalidate>    
<div class="screenshot__header">
        <h4 class="center">Создать карточку</h4>
    </div>
    <div class="screenshot__body">
        <div class="screenshot__limit">
            <div class="col">
            <label for="ucardInput"
                class="form-label fw-lighter">Название карточки:</label>
            <input type="text" class="form-control bg-light"
                id="ucardInput" placeholder="" minsize="1" required>
            <label for="wishesInput"
                class="form-label fw-lighter mt-3">Пожелания:</label>
            <input type="text" class="form-control bg-light"
                id="wishesInput" placeholder="">
              <div class="invalid-feedback">
                Пожалуйста, введите имя карточки .
              </div>
              <div class="ucard__err authorization__errors text-center mt-4 visually-hidden">
              Пожалуйста, выберите картинку.
           </div>
        </div>
        </div>
        <div class="box__pictures ucard__pictures center flex-wrap p-3">


        </div>
    </div>

    <div class="screenshot__footer center">
                <button type="submit" class="btn ucard__btn main__button active">Создать</button>

    </div>
</div>
</form>
</div>
</div>
</div>`;
        addUsrPics();
    }
    addListeners() {
        const FORM = document.getElementsByClassName('ucard__form')[0] as HTMLFormElement;
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
        checkNewCard(FORM, BOX_PICTURES, this.controller, this.model);
    }
}
