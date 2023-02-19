import { Model } from '../../model/index';
import { Controller } from '../../controller';
import { cardsImg } from '../../db/cardsImg';
import { IBoxReq, ICardReq } from '../../types/requestTypes';
import { copy, toggleLoader } from '../../utils/utils';
import { errorCats } from '../../db/errorCats';
import { drawBoxTitle } from './boxTitle';
import { drawRandomCards } from './boxManage';

export class BoxView {
    cards: ICardReq[] | undefined;
    box: IBoxReq | undefined | null;
    userCard: undefined | ICardReq | null;

    boxId: string;
    userId: string;
    constructor(private controller: Controller, private model: Model, private root: Element) {
        this.cards = [];
        this.box;
        this.userCard;
        this.boxId = '';
        this.userId = '';
    }

    async getParticipants(path: string) {
        const allBoxesOfUser = await this.controller.boxesController.getBoxes();

        const currentBoxId = path;

        this.boxId = currentBoxId;
        if (allBoxesOfUser && allBoxesOfUser.length > 0) {
            const currentBox = allBoxesOfUser.find((box) => box.box_id === Number(currentBoxId));
            return currentBox;
        }
        return null;
    }
    async getBoxCards(id: number) {
        const allCards = await this.controller.cardController.getCard(id);
        return allCards;
    }
    async render(path2: string) {
        const box = await this.getParticipants(path2);
        this.box = box;
        const userId = localStorage.getItem('id');
        userId ? (this.userId = userId) : null;
        const cards = box ? await this.getBoxCards(box.box_id) : [];
        this.cards = cards;
        const userCard = cards && cards.length > 0 ? cards.find((card) => card.user_id === Number(userId)) : null;
        this.userCard = userCard;
        this.root.innerHTML = !box
            ? `<div class="box__not" >${errorCats.boxNotFound}
            <div><p>Коробка не найдена</p><p>Похоже, вы перешли по неверной ссылке для коробки..</p></div>
            <button id="back" type="button" class="btn main__button bg-light active">
                            Вернуться на главную
                        </button></div>`
            : `<div class="box__view">
            ${this.box && this.userId ? drawBoxTitle(this.box, this.userId) : ''}
            <div class="box__cards center">
            <div class="box__wrapper">
            
            ${
                !box.is_draw && box.cards_id.length >= 3
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
        const toggleMenu = document.querySelector('.box__toggle');
        const allMenuItem: NodeListOf<Element> = document.querySelectorAll('.toggle-menu-item');
        const allMenuSlider: NodeListOf<Element> = document.querySelectorAll('.toggle-menu-item--slider');
        if (toggleMenu) {
            toggleMenu.addEventListener('click', (e) => {
                const target = e.target as HTMLDivElement;

                if (target.closest('DIV')?.classList.contains('active')) {
                    return;
                } else if (target.closest('DIV')?.classList.contains('toggle-menu-item')) {
                    this.toggleClassInList(allMenuItem, 'active');
                    this.toggleClassInList(allMenuSlider, 'active');
                    target.closest('DIV')?.classList.add('active');
                    const menuNumber = target.closest('DIV')?.id;

                    if (menuNumber) {
                        const currentSlider = document.querySelector(`.toggle-menu-item--slider.${menuNumber}`);
                        currentSlider?.classList.add('active');
                        if (this.box && this.boxId && this.userCard) {
                            switch (menuNumber.split('-')[1]) {
                                case '1':
                                    this.controller.route(location.origin + `/box/${this.boxId}`);
                                    break;
                                case '2':
                                    this.controller.route(location.origin + `/box/${this.boxId}/card`);
                                    break;
                                case '3':
                                    this.userCard.ward_id
                                        ? this.controller.route(location.origin + `/box/${this.boxId}/ward`)
                                        : this.controller.route(location.origin + `/box/${this.boxId}/ward=0`);

                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
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
        const currentBox = document.getElementById('curr-box');
        if (currentBox) {
            currentBox.addEventListener('click', () => this.controller.route(location.origin + `/box/${this.boxId}`));
        }
        const cardList = document.querySelector('.cards__list');
        if (cardList) {
            cardList.addEventListener('click', (e) => {
                const target = e.target as HTMLLIElement;
                if (target && target.closest('LI')?.classList.contains('card__wrapper')) {
                    const cardId = Number(target.closest('LI')?.id);
                    if (cardId && this.box?.admin_id === Number(this.userId)) {
                        if (this.userCard?.card_id === cardId) {
                            this.controller.route(location.origin + `/box/${this.boxId}/card`);
                        } else
                        this.controller.route(location.origin + `/box/${this.boxId}/card/edit/${cardId}`);
                    } else if (this.userCard?.card_id === cardId) {
                        this.controller.route(location.origin + `/box/${this.boxId}/card`);
                    } else if (this.userCard?.ward_id === cardId) {
                        this.controller.route(location.origin + `/box/${this.boxId}/ward`);
                    }
                }
            });
        }
        const settings = document.getElementById('setting');
        if (settings) {
            settings.addEventListener('click', () =>
                this.controller.route(location.origin + `/box/edit/${this.box?.box_id}`)
            );
        }
    }
    toggleClassInList(list: NodeListOf<Element>, className: string) {
        list.forEach((el) => el.classList.remove(className));
    }
}
