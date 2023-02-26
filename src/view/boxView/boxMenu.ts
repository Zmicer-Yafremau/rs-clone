import { boxImages } from '../../db/boxesImg';
import { Model } from '../../model/index';
import { Controller } from '../../controller';
import { IBoxReq, ICardReq } from '../../types/requestTypes';
import { getBoxCards, getParticipants } from './boxManage';
import { USR_STATE } from '../../db/usr-state';
import { copy } from '../../utils/utils';

export class BoxMenu {
    box: IBoxReq | undefined | null;
    wardId: number | undefined;
    userCard: ICardReq | undefined;
    boxId: string;
    userId: number | undefined;
    cards: ICardReq[] | undefined;
    constructor(private controller: Controller, private model: Model, private root: Element) {
        this.wardId;
        this.userCard;
        this.box;
        this.boxId = '';
        this.userId;
        this.cards;
    }

    async render(path2: string) {
        this.boxId = path2;
        const box = await getParticipants(path2, this.controller.boxesController);
        if (box) {
            this.box = box;
            const userId = USR_STATE.id;
            userId ? (this.userId = userId) : null;
            const cards = box ? await getBoxCards(box.box_id, this.controller.cardController) : [];
            this.cards = cards;
            const userCard = cards && cards.length > 0 ? cards.find((card) => card.user_id === Number(userId)) : null;
            if (userCard) {
                this.userCard = userCard;
            }

            if (this.userCard && this.userCard.ward_id) {
                this.wardId = this.userCard?.ward_id;
            }
            const locationArr = window.location.pathname.split('/');
            const wardInPath = locationArr.slice(-1)[0];
            const active1 = locationArr.length === 3 || locationArr.includes('santas') ? 'active' : '';
            const active2 =
                locationArr.length > 3 && locationArr[3].includes('card') && Number(wardInPath) !== userCard?.ward_id
                    ? 'active'
                    : '';
            const active3 =
                (locationArr.length > 3 && locationArr[3].includes('ward')) || Number(wardInPath) === userCard?.ward_id
                    ? 'active'
                    : '';
            this.root.innerHTML = box
                ? `
            <div class="box__view">
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
          this.userId !== this.box?.admin_id
              ? `<input id="copy"
        type="text"
        class="copy-link-input copy-email" data-tippy-arrow="false"
        data-tippy-content="Email скопирован"
        data-tippy-placement="bottom-start" readonly />`
              : `<span class="admin-name">Вы организатор</span>`
      }</div>
      </div>
  </div>
</div>
<div class="box__toggle">
  <div class="toggle-menu">
      <div class="toggle-menu-panel">
          <div class="toggle-menu-item--slider num-1 ${active1}"></div>
          <div class="toggle-menu-item--slider num-2 ${active2}"></div>
          <div class="toggle-menu-item--slider num-3 ${active3}"></div>
      </div>
      <div id="num-1" class="toggle-menu-item ${active1}">
          <span class="txt">Участники</span>
      </div>
      <div id="num-2" class="toggle-menu-item ${active2}"><span class="txt">Моя карточка</span></div>
      <div id="num-3" class="toggle-menu-item ${active3}"><span class="txt">Подопечный</span></div>
  </div>

  ${
      userId && box.admin_id === Number(userId)
          ? `
  <div id="setting" class="toggle-menu-button">
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
</div></div></div></div>            
`
                : '  <div class="box__view"></div>';
            this.addListeners();
        }
    }

    addListeners() {
        const link = document.querySelector('.copy-email') as HTMLInputElement;
        if (this.userId !== this.box?.admin_id) {
            link.value = `${this.box?.admin_name}`;
            const adminCard = this.cards?.find((card) => card.user_id === this.box?.admin_id);
            link.value = `${adminCard ? adminCard.email : this.box?.admin_name}`;
            link ? copy(link) : null;
            link.value = `${this.box?.admin_name}`;
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
                                    this.controller.route(this.model.route.origin + `/box/${this.boxId}`);
                                    break;
                                case '2':
                                    this.controller.route(this.model.route.origin + `/box/${this.boxId}/card`);
                                    break;
                                case '3':
                                    this.userCard.ward_id
                                        ? this.controller.route(this.model.route.origin + `/box/${this.boxId}/ward`)
                                        : this.controller.route(this.model.route.origin + `/box/${this.boxId}/ward=0`);

                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
            });
        }
        const currentBox = document.getElementById('curr-box');
        if (currentBox) {
            currentBox.addEventListener('click', () =>
                this.controller.route(this.model.route.origin + `/box/${this.box?.box_id}`)
            );
        }
        const settings = document.getElementById('setting');
        if (settings) {
            settings.addEventListener('click', () =>
                this.controller.route(this.model.route.origin + `/box/${this.box?.box_id}/edit`)
            );
        }
    }
    toggleClassInList(list: NodeListOf<Element>, className: string) {
        list.forEach((el) => el.classList.remove(className));
    }
}
