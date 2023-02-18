import { Model } from '../../model/index';
import { Controller } from '../../controller';
import { drawBoxTitle } from '../boxView/boxTitle';
import { addUsrPics } from '../newBoxView/add-usr-pics';
import { toggleLoader } from '../../utils/utils';
import { IBoxReq, ICardReq } from '../../types/requestTypes';

export class EditCardView {
    box: IBoxReq | undefined;
    cards: ICardReq[] | undefined;
    userId: string;
    cardId: ICardReq | undefined;
    constructor(private controller: Controller, private model: Model, private root: Element) {
        this.box = undefined;
        this.cards = [];
        this.cardId = undefined;
        this.userId = '';
    }

    async render(path: string) {
        const boxId = Number(path);
        const box = await this.controller.boxesController.getBox(boxId);
        this.box = box;
        const userId = localStorage.getItem('id');
        userId ? (this.userId = userId) : null;
        const cards = await this.controller.cardController.getCard(box.box_id);
        const cardId = cards?.find((card) => card.user_id === Number(userId));
        this.cardId = cardId;

        this.root.innerHTML = `
      <div class="box__view">
      ${box && userId ? drawBoxTitle(box, userId) : ''}
      <div class="box__edit  box">
      <div class="edit-card__wrapper container">
          <div class="section">
              <h4>Настройки карточки</h4>
          </div>
          <div class="section">
                      <div class="col-4"><h5 class="">Имя и телефон</h5></div>
                      <div class="wrapper__name-phone">
                      <div class="check-section input">
                      <div class="input-box">
                          <label for="inputNameUser" >Ваше имя</label>
                          <input
                              type="text"
                              class="form-control"
                              id="inputNameUser"
                              placeholder=""
                              minlength="1"
                              value="${cardId?.user_name}" 
                          />
                          </div>
                      </div>
                      <div class="check-section input">
                      <div class="input-box">
                          <label for="inputNumberPhone" >Номер телефона</label>
                          <input
                              type="text"
                              class="form-control"
                              id="inputNumberPhone"
                              placeholder=""
                              minlength="1" 
                              value="${cardId?.phone}" 
                          />
                          </div>
                      </div>
                      </div>
          </div>
          <div class="section">
                      <div class="col-4">
                          <h5 class="">Обложка для карточки</h5>
                      </div>
                      <div class="check-section col-5 input">
                          <div class="box__pictures center flex-wrap p-3">
                          </div>
                      </div>
          </div>
          <div class="section card-column">
          <div class="card-row">
                  <div class="col-4"><h5 class="">Пожелания</h5></div>
                  <div class="form-wish">
                  <div class="tip">
                  <div class="tip-icon">
                  <span class="svg info base--clickable">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="width: 1.5rem; height: 1.5rem; background: none;">
                  <path d="M11.996 7a1 1 0 10.009 2 1 1 0 00-.009-2z" fill="#67568C"></path>
                  <path d="M12 21a9 9 0 01-9-9 9 9 0 019-9 9 9 0 019 9 9 9 0 01-9 9zM12 12v5" stroke="#67568C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  </path></svg>
                  </span>
                  </div>
                  <section>
                  <div class="layout-row-space-between">
                  <span class="txt-secondary txt">
                  Расскажите о себе, какому подарку вы были бы рады или что точно не хотели бы получить. Вы сможете обновить пожелания даже после проведения жеребьевки — ваш Санта получит об этом уведомление.
                  </span>
                  </div>
                  </section>
                  </div>
                  <div class="check-section input">
                  <div class="input-box">
                  <label for="inputWishes">Пожелания</label>
                  <textarea id="inputWishes" class="form-control" required rows="6"></textarea>
                  </div>
                  </div>
                  </div>
          </div>
          <div class="form-page__footer">
          <div class="form-page__buttons">
          <div class="btn-secondary btn-back">Назад к карточке</div>
          <div id="submitCardEdit" type="button" class="btn main__button active center">Сохранить изменения</div>
          </div>
          </div>        
          </div>     
          <div class="section">
              <div class="col-4"><h5 class="">Удаление карточки</h5></div>
              <div class="check-section wrapper__name-phone">
              ${
                  this.box.is_draw
                      ? `<span class="hint txt-secondary">Вы не можете самостоятельно удалить карточку после проведения жеребьевки.
              Если вы передумали участвовать в игре, обратитесь к организатору, он сможет удалить вашу карточку.</span>`
                      : `<span class="hint txt-secondary">Вы можете удалить карточку, если не желаете участвовать в игре.</span>
              <label for="inputDeleteCard" class="">Для подтверждения введите: <strong>Удалить карточку</strong></label>
              <input
                  type="text"
                  class="form-control"
                  id="inputDeleteCard"
                  placeholder=""
                  minlength="1"
              />`
              }
                  <button id="submit-delete" type="submit" class="btn bg-none">Удалить</button>
              </div>
          </div>
      </div>
    </div> 
      </div>`;
        addUsrPics();
    }

    addListeners() {
        const deleteCardInput = document.querySelector('#inputDeleteCard');
        const submitDeleteButton = document.querySelector('#submit-delete');
        if (deleteCardInput) {
            deleteCardInput.addEventListener('input', (e) => {
                const target = e.target as HTMLInputElement;
                target.value === 'Удалить карточку'
                    ? submitDeleteButton?.classList.add('show')
                    : submitDeleteButton?.classList.remove('show');
            });
        }

        const imgBox = document.querySelector('.check-section .box__pictures');
        const allImg = document.querySelectorAll('.box__svg');
        const inputNameUser = document.querySelector('#inputNameUser') as HTMLInputElement;
        const inputNumberPhone = document.querySelector('#inputNumberPhone');
        const inputWishes = document.querySelector('#inputWishes');
        const submitCardEdit = document.querySelector('#submitCardEdit');
        const imgActive = Array.from(allImg).find((img) => img.children[0].classList[0] === this.cardId?.card_img);
        imgActive?.classList.add('active');
        let newImg = '';
        let newName = '';
        let newNumber = '';
        let newWishes = '';

        if (imgBox) {
            imgBox.addEventListener('click', (e) => {
                const target = e.target as HTMLDivElement;
                const targetDiv = target.closest('DIV') as HTMLDivElement;
                if (target && targetDiv.classList.contains('box__svg')) {
                    this.deleteClass(allImg);
                    targetDiv.classList.add('active');
                    newImg = targetDiv.children[0].classList[0];
                }
            });
        }

        if (inputNameUser) {
            inputNameUser.addEventListener('input', (e) => {
                const target = e.target as HTMLInputElement;
                newName = target.value;
            });
        }
        if (inputNumberPhone) {
            inputNumberPhone.addEventListener('input', (e) => {
                const target = e.target as HTMLInputElement;
                newNumber = target.value;
            });
        }

        if (inputWishes) {
            inputWishes.addEventListener('input', (e) => {
                const target = e.target as HTMLInputElement;
                newWishes = target.value;
            });
        }

        if (imgBox && inputNameUser && inputNumberPhone && inputWishes && submitCardEdit) {
            submitCardEdit.addEventListener('click', async (e) => {
                if (this.box && this.cardId) {
                    toggleLoader();
                    if (newImg) {
                        this.cardId = await this.controller.cardController.updateCard(this.cardId.card_id, {
                            cardImg: newImg,
                        });
                    }
                    if (newName) {
                        this.cardId = await this.controller.cardController.updateCard(this.cardId.card_id, {
                            userName: newName,
                        });
                    }
                    if (newNumber) {
                        this.cardId = await this.controller.cardController.updateCard(this.cardId.card_id, {
                            phone: newNumber,
                        });
                    }
                    if (newWishes) {
                        this.cardId = await this.controller.cardController.updateCard(this.cardId.card_id, {
                            wishes: newWishes,
                        });
                    }
                    this.controller.route(location.href);
                    toggleLoader();
                }
            });
        }

        const buttonBack = document.querySelector('.btn-back');
        if (buttonBack) {
            buttonBack.addEventListener('click', () => {
                this.controller.route(location.origin + `/box/${this.box?.box_id}/card`);
            });
        }

        // const buttonDelete = document.querySelector('#submit-delete');
        // if (buttonDelete) {
        //     buttonDelete.addEventListener('click', () => {
        //         toggleLoader();
        //         deleteBox(this.cards, this.box, this.controller, Number(this.userId));
        //         toggleLoader();
        //         this.controller.route(location.origin + `/account/boxes`);
        //     });
        // }
    }
    deleteClass(el: NodeListOf<Element>) {
        el.forEach((el) => el.classList.remove('active'));
    }
}
