import { Model } from '../../model/index';
import { Controller } from '../../controller';
import { addUsrPics } from '../newBoxView/add-usr-pics';
import { toggleLoader } from '../../utils/utils';
import { IBoxReq, ICardReq } from '../../types/requestTypes';
import { USR_STATE } from '../../db/usr-state';

export class EditCardView {
    box: IBoxReq | undefined;
    cards: ICardReq[] | undefined;
    userId: number | undefined;
    card: ICardReq | undefined;
    constructor(private controller: Controller, private model: Model, private root: Element) {
        this.box = undefined;
        this.cards = [];
        this.card = undefined;
        this.userId;
    }

    async render(path: string, pathId: string) {
        const boxId = Number(path);
        const box = await this.controller.boxesController.getBox(boxId);
        this.box = box;
        const userId = USR_STATE.id;
        userId ? (this.userId = userId) : null;
        const cards = await this.controller.cardController.getCard(box.box_id);
        this.cards = cards;
        if (pathId !== undefined) {
            const card = cards?.find((card) => card.card_id === Number(pathId));
            this.card = card;
        } else {
            const cardId = cards?.find((card) => card.user_id === Number(userId));
            this.card = cardId;
        }
        const deleteCard = `<label for="inputDeleteCard" class="">Для подтверждения введите: <strong>Удалить карточку</strong></label>
        <input type="text" class="form-control" id="inputDeleteCard" placeholder="" minlength="1"/>`;

        if (box && userId) {
            const placeToInsert = document.querySelector('.box__view');
            if (placeToInsert && placeToInsert.children.length > 1) {
                placeToInsert.children[1].remove();
            }
            const div = document.createElement('div');
            div.classList.add('box__edit', 'box');
            div.innerHTML = `
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
                              required
                              type="text"
                              class="form-control"
                              id="inputNameUser"
                              placeholder=""
                              minlength="1"
                              value="${this.card?.user_name}" 
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
                              value="${this.card?.phone ? this.card?.phone : ''}" 
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
                  <textarea id="inputWishes" class="form-control" required rows="6">${this.card?.wishes}</textarea>
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
                  !this.box.is_draw
                      ? `<span class="hint txt-secondary">Вы можете удалить карточку, если не желаете участвовать в игре.</span>
             ${deleteCard}`
                      : userId && box.admin_id !== Number(userId)
                      ? `<span class="hint txt-secondary">Вы не можете самостоятельно удалить карточку после проведения жеребьевки.
              Если вы передумали участвовать в игре, обратитесь к организатору, он сможет удалить вашу карточку.</span>`
                      : box.cards_id.length > 2
                      ? `<span class="hint txt-secondary">Вы можете удалить карточку участника, если он передумал участвовать в игре. 
                    Санте данного участника отправится уведомление о смене подопечного — он будет дарить подарок подопечному текущего участника.</span> ${deleteCard}`
                      : `<span class="hint txt-secondary">Вы не можете удалить карточку участника, пока не отмените проведение жеребьевки.</span>`
              }
                  <button id="submit-delete" type="submit" class="btn bg-none">Удалить</button>
              </div>
          </div>
      </div>
    `;
            placeToInsert ? placeToInsert.append(div) : null;
            addUsrPics();
        }
    }

    async addListeners() {
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

        const imgBox = document.querySelector('.check-section .box__pictures') as Element;
        const allImg = document.querySelectorAll('.box__svg');
        const inputNameUser = document.querySelector('#inputNameUser') as HTMLInputElement;
        const inputNumberPhone = document.querySelector('#inputNumberPhone') as HTMLInputElement;
        const inputWishes = document.querySelector('#inputWishes') as HTMLInputElement;
        const submitCardEdit = document.querySelector('#submitCardEdit') as HTMLDivElement;
        const imgActive = Array.from(allImg).find((img) => img.children[0].classList[0] === this.card?.card_img);
        imgActive?.classList.add('active');
        let newImg: string;
        let newName: string;
        let newNumber: string;
        let newWishes: string;

        imgBox.addEventListener('click', (e) => {
            const target = e.target as HTMLDivElement;
            const targetDiv = target.closest('DIV') as HTMLDivElement;
            if (target && targetDiv.classList.contains('box__svg')) {
                this.deleteClass(allImg);
                targetDiv.classList.add('active');
                newImg = targetDiv.children[0].classList[0];
            }
        });

        inputNameUser.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            newName = target.value.trim();
        });
        inputNumberPhone.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            newNumber = target.value.trim();
        });
        inputWishes.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            newWishes = target.value.trim();
        });

        if (submitCardEdit) {
            submitCardEdit?.addEventListener('click', async () => {
                if (this.box && this.card) {
                    toggleLoader();
                    if (newImg) {
                        this.card = await this.controller.cardController.updateCard(this.card.card_id, {
                            cardImg: newImg,
                        });
                    }
                    if (newName) {
                        this.card = await this.controller.cardController.updateCard(this.card.card_id, {
                            userName: newName,
                        });
                    }
                    this.card = await this.controller.cardController.updateCard(this.card.card_id, {
                        phone: newNumber,
                        wishes: newWishes,
                    });
                    this.controller.route(this.model.route.origin + `/box/${this.box?.box_id}/card`);
                    toggleLoader();
                }
            });
        }

        const buttonBack = document.querySelector('.btn-back');
        if (buttonBack) {
            buttonBack.addEventListener('click', () => {
                this.controller.route(this.model.route.origin + `/box/${this.box?.box_id}/card`);
            });
        }

        const buttonDelete = document.querySelector('#submit-delete');
        if (buttonDelete) {
            buttonDelete.addEventListener('click', async () => {
                toggleLoader();
                if (this.box && this.card && this.cards && this.userId) {
                    if (this.box.is_draw) {
                        const santa = this.cards.find((card) => card.ward_id === this.card?.card_id);
                        if (santa) {
                            await this.controller.cardController.updateCard(santa.card_id, {
                                wardId: this.card.ward_id,
                            });
                        }
                    }
                    const newBox = this.box?.cards_id.filter((id) => id !== this.card?.card_id);
                    await this.controller.boxesController.updateBox(this.box.box_id, { cardsId: newBox });
                    await this.controller.cardController.deleteCard(this.card.card_id);
                    if (this.box.admin_id !== Number(this.userId)) {
                        const userBox = await this.controller.userBoxesController.getUserBoxes(this.userId);
                        const newUserBox = userBox[0].user_boxes.filter((box) => box !== this.box?.box_id);
                        await this.controller.userBoxesController.updateUserBoxes(
                            userBox[0].id,
                            newUserBox,
                            this.userId
                        );
                    }
                }
                toggleLoader();
                this.controller.route(this.model.route.origin + `/account/boxes`);
            });
        }
    }
    deleteClass(el: NodeListOf<Element>) {
        el.forEach((el) => el.classList.remove('active'));
    }
}
