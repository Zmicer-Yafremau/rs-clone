import { Model } from '../../model/index';
import { Controller } from '../../controller';
import { cardsImg } from '../../db/cardsImg';
import { IBoxReq, ICardReq } from '../../types/requestTypes';
import { copy, toggleLoader } from '../../utils/utils';
import { errorCats } from '../../db/errorCats';
import { drawRandomCards, getBoxCards, getParticipants } from './boxManage';

export class BoxView {
    cards: ICardReq[] | undefined;
    box: IBoxReq | undefined | null;
    userCard: undefined | ICardReq | null;
    userId: string;
    constructor(private controller: Controller, private model: Model, private root: Element) {
        this.cards = [];
        this.box;
        this.userCard;
        this.userId = '';
    }

    async render(path2: string) {
        const box = await getParticipants(path2, this.controller.boxesController);
        this.box = box;
        const userId = localStorage.getItem('id');
        userId ? (this.userId = userId) : null;
        const cards = box ? await getBoxCards(box.box_id, this.controller.cardController) : [];
        this.cards = cards;
        const userCard = cards && cards.length > 0 ? cards.find((card) => card.user_id === Number(userId)) : null;
        this.userCard = userCard;
        if (!box) {
            this.root.innerHTML = `<div class="box__not" >${errorCats.boxNotFound}
            <div><p>Коробка не найдена</p><p>Похоже, вы перешли по неверной ссылке для коробки..</p></div>
            <button id="back" type="button" class="btn main__button bg-light active">
                            Вернуться на главную
                        </button></div>`;
        } else {
            const placeToInsert = document.querySelector('.box__view');

            const div = document.createElement('div');
            div.classList.add('box__cards', 'center');
            div.innerHTML = `
            <div class="box__wrapper">
            
            ${
                !box.is_draw && box.cards_id.length >= 3 && box.admin_id === Number(this.userId)
                    ? '<button id="draw" class="btn main__button bg-light active ward">Провести жеребьевку</button>'
                    : ''
            }
            <ul class="cards__list">
            ${
                cards && cards.length > 0
                    ? cards
                          .map(
                              (card) =>
                                  `<li id=${card.card_id} class="card__wrapper">
                                  <div class="card-img">${cardsImg[card.card_img]}</div>
                                  <div class="card-info">
                                      <p>${card.user_name}</p>
                                      <div class="card__bottom">
                                      ${
                                          card.user_id === Number(userId)
                                              ? `<span class="txt"> Это вы</span>
                                              `
                                              : ''
                                      }
                                      ${
                                          userCard && userCard.ward_id === card.card_id
                                              ? '<span class="txt">Ваш подопечный</span>'
                                              : ''
                                      }
                                          ${
                                              box.is_draw
                                                  ? '<div class="dot"></div><span class="txt">Знает кому дарить</span>'
                                                  : ''
                                          }
                                      </div>
                                  </div>
                              
                          </li>`
                          )
                          .join('')
                    : `<div class="cards__not center d-flex flex-column" >
                    <h4 ><strong>Пока что никого нет</strong>
                    </h4><p class="txt">Чтобы начать игру, добавьте своих друзей</p><div class="m-3">${errorCats.noCards}</div>
                    <div class="check-section col-5 link">
                    <p>Скопируйте ссылку ниже и отправьте её своим друзьям. После перехода по ссылке, участники смогут создать карточки для участия самостоятельно.</p>
                    <p class="link-copy">
                      Ccылка-приглашение (кликните, чтобы скопировать):
                     
                     </p> 
                     <input id="copy-link" type="text" class="copy-link-input"  data-tippy-arrow="false" data-tippy-content="Ссылка скопирована" data-tippy-placement="bottom-start",  readonly>
                     </div>
                  </div>`
            }
            
            </ul>
          </div>
         </div>
        </div>
        `;
            placeToInsert ? placeToInsert.append(div) : null;
        }
    }

    addListeners() {
        const link = document.querySelector('.copy-link-input') as HTMLInputElement;
        if (link) {
            link.value = `${location.origin}/invite/${this.box?.invited_key}`;
            copy(link);
        }
        const buttonBack = document.querySelector('#back');
        if (buttonBack) {
            buttonBack.addEventListener('click', (e) => {
                this.controller.route(location.origin + '/');
            });
        }

        const buttonDraw = document.getElementById('draw');
        if (buttonDraw && this.cards && this.box) {
            buttonDraw.addEventListener('click', async () => {
                toggleLoader();
                const result = await drawRandomCards(this.cards, this.box, this.controller);
                if (result) {
                    this.box = result.box;
                    this.cards = result.cards;
                }
                toggleLoader();
            });
        }
        const cardList = document.querySelector('.cards__list');
        if (cardList) {
            cardList.addEventListener('click', (e) => {
                const target = e.target as HTMLLIElement;
                if (target && target.closest('LI')?.classList.contains('card__wrapper')) {
                    const cardId = Number(target.closest('LI')?.id);
                    if (cardId && this.box?.admin_id === Number(this.userId)) {
                        this.controller.route(location.origin + `/box/${this.box?.box_id}/card=${cardId}`);
                    } else if (this.userCard?.card_id === cardId) {
                        this.controller.route(location.origin + `/box/${this.box?.box_id}/card=${cardId}`);
                    } else if (this.userCard?.ward_id === cardId) {
                        this.controller.route(location.origin + `/box/${this.box?.box_id}/ward=${cardId}`);
                    }
                }
            });
        }
    }
}
