import { Model } from '../../model/index';
import { Controller } from '../../controller';
import { boxImages } from '../../db/boxesImg';
import { cardsImg } from '../../db/cardsImg';
import { IBoxReq, ICardReq } from '../../types/requestTypes';
import { mixArr } from '../../utils/utils';

export class BoxView {
    cards: ICardReq[] | undefined;
    box: IBoxReq | undefined | null;
    userCard: undefined | ICardReq | null;
    boxName: string;
    boxId: string;
    constructor(private controller: Controller, private model: Model, private root: Element) {
        this.cards = [];
        this.box;
        this.userCard;
        this.boxName = '';
        this.boxId = '';
    }

    async getParticipants(path: string) {
        const allBoxesOfUser = await this.controller.boxesController.getBoxes();

        const currentBoxName = path.split('=')[0];
        const currentBoxId = path.split('=')[1];
        this.boxName = currentBoxName;
        this.boxId = currentBoxId;
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
    async getBoxCards(id: number) {
        const allCards = await this.controller.cardController.getCard(id);
        return allCards;
    }
    async render(path: string) {
        const box = await this.getParticipants(path);
        this.box = box;
        const userId = localStorage.getItem('id');
        const cards = box ? await this.getBoxCards(box.box_id) : [];
        this.cards = cards;
        const userCard = cards && cards.length > 0 ? cards.find((card) => card.user_id === Number(userId)) : null;
        this.userCard = userCard;
        this.root.innerHTML = !box
            ? `<div class="box__not" >${boxImages['boxNotFound']}
            <div><p>Коробка не найдена</p><p>Похоже, вы перешли по неверной ссылке для коробки..</p></div>
            <button type="button" class="btn main__button bg-light active">
                            Вернуться на главную
                        </button></div>`
            : `<div class="box__view">
            <div class="box__menu-wrapper">
            <div class="box__menu">
                <div class="box__info">
                    <div id="curr-box" class="box-img">${boxImages[box.box_img]}</div>
                    <div class="box-description">
                        <h4>${box.box_name}</h4>
                        <div class="description-bottom">
                        <div> <span>Участников: ${box.cards_id.length}</span>
                        <div class="dot"></div></div>
                        <div  class="admin"><span>Организатор:</span> <span class="admin-name">${
                            userId && box.admin_id === Number(userId) ? 'Вы организатор' : box.admin_name
                        }</span></div>
                        </div>
                    </div>
                </div>
                <div class="box__toggle">
                    <div class="toggle-menu">
                        <div class="toggle-menu-panel">
                            <div class="toggle-menu-item--slider num-1 active"></div>
                            <div class="toggle-menu-item--slider num-2"></div>
                            <div class="toggle-menu-item--slider num-3"></div>
                        </div>
                        <div id="num-1" class="toggle-menu-item active">
                            <span class="txt">Участники</span>
                        </div>
                        <div id="num-2" class="toggle-menu-item"><span class="txt">Моя карточка</span></div>
                        <div id="num-3" class="toggle-menu-item"><span class="txt">Подопечный</span></div>
                    </div>
                    ${
                        userId && box.admin_id === Number(userId)
                            ? `
                    <div class="toggle-menu-button">
                    <div class="toggle-menu-button--inner">
                        <span class="svg settings" style="width: 24px; height: 24px; background: none"
                            ><svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                style="width: 1.5rem; height: 1.5rem; background: none"
                            >
                                <path
                                    d="M12.8 3v0a1 1 0 01.941.662l.508 1.415v0c.08.223.237.41.442.528l1.507.87v0a1 1 0 00.677.118l1.48-.267v0a1 1 0 011.045.484l.8 1.38v0a1 1 0 01-.1 1.146l-.97 1.148v0a1 1 0 00-.238.646v1.74a1 1 0 00.237.646l.971 1.148v0a1 1 0 01.1 1.146l-.8 1.38v0a1 1 0 01-1.044.484l-1.48-.267v0a1 1 0 00-.677.118l-1.507.87v0a1.005 1.005 0 00-.442.528l-.508 1.415v0A1 1 0 0112.8 21h-1.6v0a1 1 0 01-.94-.662l-.509-1.415v0a1.009 1.009 0 00-.44-.528l-1.509-.87v0a1 1 0 00-.677-.118l-1.48.267v0A1 1 0 014.6 17.19l-.8-1.38v0a1 1 0 01.1-1.146l.971-1.148v0a1 1 0 00.237-.646v-1.74 0a1 1 0 00-.237-.646l-.96-1.148v0a1 1 0 01-.1-1.146l.8-1.38v0a1 1 0 011.043-.484l1.48.267v0a1 1 0 00.677-.118l1.508-.87h0c.204-.119.36-.306.441-.528l.508-1.415v0A1 1 0 0111.2 3h1.6z"
                                    stroke="#333640"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                                <path
                                    d="M12 14.75a2.75 2.75 0 100-5.5 2.75 2.75 0 000 5.5z"
                                    stroke="#333640"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path></svg
                        ></span>
                    </div></div>`
                            : ''
                    }
                </div></div>
            </div>
            <div class="box__cards">
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
                    : ''
            }
            
            </ul>
          </div>
         </div>
        </div>
        `;
    }
    addListeners() {
        const buttonBack = document.querySelector('.box__not .main__button');
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
                                    this.controller.route(location.origin + `/box/${this.boxName}=${this.boxId}`);
                                    break;
                                case '2':
                                    this.controller.route(
                                        location.origin +
                                            `/box/${this.boxName}=${this.boxId}/card=${this.userCard.card_id}`
                                    );
                                    break;
                                case '3':
                                    this.userCard.ward_id
                                        ? this.controller.route(
                                              location.origin +
                                                  `/box/${this.boxName}=${this.boxId}/card=${this.userCard.ward_id}`
                                          )
                                        : this.controller.route(
                                              location.origin + `/box/${this.boxName}=${this.boxId}/ward=0`
                                          );

                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
            });
            const buttonDraw = document.getElementById('draw');
            if (buttonDraw) {
                buttonDraw.addEventListener('click', () => {
                    this.drawRandomCards();
                    console.log('s');
                });
            }
            const currentBox = document.getElementById('curr-box');
            if (currentBox) {
                currentBox.addEventListener('click', () =>
                    this.controller.route(location.origin + `/box/${this.boxName}=${this.boxId}`)
                );
            }
        }
        const cardList = document.querySelector('.cards__list');
        if (cardList) {
            cardList.addEventListener('click', (e) => {
                const target = e.target as HTMLLIElement;
                if (target && target.closest('LI')?.classList.contains('card__wrapper')) {
                    const cardId = target.closest('LI')?.id;
                    if (cardId) {
                        this.controller.route(location.origin + `/box/${this.boxName}=${this.boxId}/card=${cardId}`);
                    }
                }
            });
        }
    }
    toggleClassInList(list: NodeListOf<Element>, className: string) {
        list.forEach((el) => el.classList.remove(className));
    }

    async drawRandomCards() {
        const cardsId = this.cards?.map((card) => card.card_id);
        if (cardsId && cardsId.length >= 3 && this.box) {
            let mixedArr = mixArr(cardsId);
            let result = cardsId.some((id, i) => id === mixedArr[i]);
            while (result) {
                mixedArr = mixArr(cardsId);
                result = cardsId.some((id, i) => id === mixedArr[i]);
            }

            const cardWards = cardsId.map((item, i) => [item, mixedArr[i]]);
            const updateCards = await Promise.all(
                cardWards.map(
                    async (cards) => await this.controller.cardController.updateCard(cards[0], { wardId: cards[1] })
                )
            );
            this.cards = updateCards;
            const updateBox = await this.controller.boxesController.updateBox(this.box.box_id, { isDraw: true });
            this.box = updateBox;
            this.controller.route(location.origin + `/box/${this.boxName}=${this.boxId}`);
        }
    }
}
