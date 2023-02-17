import { Model } from '../../model/index';
import { Controller } from '../../controller';

import { drawBoxTitle } from '../boxView/boxTitle';
import { addBoxPics } from '../newBoxView/add-box-pics';
import { copy, toggleLoader } from '../../utils/utils';
import { IBoxReq, ICardReq } from '../../types/requestTypes';
import { deleteBox, drawRandomCards, redrawRandomCards } from '../boxView/boxManage';
import { boxImages } from '../../db/boxesImg';

export class EditBoxView {
    box: IBoxReq | undefined;

    cards: ICardReq[] | undefined;
    userId: string;
    constructor(private controller: Controller, private model: Model, private root: Element) {
        this.box = undefined;
        this.cards = [];

        this.userId = '';
    }

    async getBox(id: number) {
        return await this.controller.boxesController.getBox(id);
    }

    async render(path3: string) {
        const boxId = Number(path3);
        const box = await this.getBox(boxId);
        this.box = box;
        const userId = localStorage.getItem('id');
        userId ? (this.userId = userId) : null;
        const allCards = await this.controller.cardController.getCard(box.box_id);
        this.cards = allCards;
        if (box && userId) {
            this.root.innerHTML = `
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
</div></div>
</div>
            <div class="box__edit  box">
            <div class="edit__wrapper container">
                <div class="section">
                    <h4>Настройки коробки</h4>
                </div>
                
                    <div>
                        <div class="section">
                            <div class="col-4"><h5 class="">Название</h5></div>
                            <div class="check-section col-5 input">
                            <div class="input-box">
                                <label for="inputNameBox" >Название:</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="inputNameBox"
                                    placeholder=""
                                    minlength="1"
                                   
                                /></div>
                                <button id="submitBoxName" type="button" class="btn text-secondary bg-none">Сохранить</button>
                            </div>
                        </div>
                        <div class="section">
                            <div class="col-4">
                                <h5 class="">Обложка</h5>
                            </div>
        
                            <div class="check-section col-5">
                                <div class="box__pictures d-flex center"></div>
                                <button  id="submitBoxImg"  type="button" class="btn text-secondary bg-none">Сохранить</button>
                            </div>
                            
                        </div>
                        </div>
                        <div class="section">
                        <div class="col-4"><h5 class="">Пригласить по ссылке</h5></div>
                        <div class="check-section col-5 link">
                          <p>Скопируйте ссылку ниже и отправьте её своим друзьям. После перехода по ссылке, участники смогут создать карточки для участия самостоятельно.</p>
                          <p class="link-copy">
                            Ccылка-приглашение (кликните, чтобы скопировать):
                           
                           </p> 
                           <input id="copy-link" type="text" class="copy-link-input"  data-tippy-arrow="false" data-tippy-content="Ссылка скопирована" data-tippy-placement="bottom-start",  readonly>
                          
                        </div>
                    </div>
                    <div class="section">
                        <div class="col-4"><h5 class="">Жеребьевка</h5></div>
                        <div class="check-section col-5">
                         ${
                             !this.box.is_draw && this.box.cards_id.length >= 3
                                 ? `<button id="draw" type="button" class="btn main__button bg-light active">Провести жеребьевку</button>`
                                 : !this.box.is_draw && box.cards_id.length < 3
                                 ? `<div class='text'><p>Чтобы провести жеребьевку, вам необходимо добавить еще хотя бы двух друзей.</p></div>`
                                 : `<button id="redraw" type="button" class="btn main__button bg-light active">Сбросить жеребьевку</button>`
                         }
                        </div>
                    </div>
                    <div class="section">
                    <div class="col-4"><h5 class="">Удалить коробку</h5></div>
                    <div class="check-section col-5">
                    <p class="warn"><strong>Важно:</strong> вы не сможете вернуть коробку назад после удаления.</p>
                        <label for="inputDeleteBox" class="">Для подтверждения введите: <strong>Удалить коробку</strong></label>
                        <input
                            type="text"
                            class="form-control"
                            id="inputDeleteBox"
                            placeholder=""
                            minlength="1"
                           
                        />
                        <button id="submit-delete" type="submit" class="btn  bg-none">Удалить</button>
                    </div>
                </div>
                    
               
            </div>
        </div></div>
       
        `;
            addBoxPics();
        }
    }
    addListeners() {
        const currentBox = document.getElementById('curr-box');

        if (currentBox) {
            currentBox.addEventListener('click', () =>
                this.controller.route(location.origin + `/box/${this.box?.box_id}`)
            );
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
        const buttonRedraw = document.getElementById('redraw');
        if (buttonRedraw && this.cards && this.box) {
            buttonRedraw.addEventListener('click', async () => {
                toggleLoader();
                const result = await redrawRandomCards(this.cards, this.box, this.controller);
                if (result) {
                    this.box = result.box;
                    this.cards = result.cards;
                }
                toggleLoader();
            });
        }
        const link = document.querySelector('.copy-link-input') as HTMLInputElement;
        link.value = `${location.origin}/invite/${this.box?.invited_key}`;
        link ? copy(link) : null;
        const deleteBoxInput = document.querySelector('#inputDeleteBox');
        const submitDeleteButton = document.querySelector('#submit-delete');
        if (deleteBoxInput) {
            deleteBoxInput.addEventListener('input', (e) => {
                const target = e.target as HTMLInputElement;
                target.value === 'Удалить коробку'
                    ? submitDeleteButton?.classList.add('show')
                    : submitDeleteButton?.classList.remove('show');
            });
        }
        const imgBox = document.querySelector('.check-section .box__pictures');
        const allImg = document.querySelectorAll('.box__svg');
        const inputNameBox = document.querySelector('#inputNameBox');
        const submitBoxImg = document.querySelector('#submitBoxImg');
        const submitBoxName = document.querySelector('#submitBoxName');
        if (imgBox && submitBoxImg) {
            let newImg = '';
            imgBox.addEventListener('click', (e) => {
                const target = e.target as HTMLDivElement;
                const targetDiv = target.closest('DIV') as HTMLDivElement;
                if (target && targetDiv.classList.contains('box__svg')) {
                    this.deleteClass(allImg);
                    targetDiv.classList.add('active');
                    newImg = targetDiv.children[0].classList[1];
                }
            });
            submitBoxImg.addEventListener('click', async (e) => {
                if (newImg && this.box) {
                    toggleLoader();
                    this.box = await this.controller.boxesController.updateBox(this.box.box_id, { boxImg: newImg });
                    this.controller.route(location.origin + `/box/edit/${this.box.box_id}`);
                    toggleLoader();
                }
            });
        }

        if (inputNameBox && submitBoxName) {
            let newName = '';
            inputNameBox.addEventListener('input', (e) => {
                const target = e.target as HTMLInputElement;
                newName = target.value;
            });
            submitBoxName.addEventListener('click', async (e) => {
                if (newName && this.box && this.userId) {
                    toggleLoader();
                    this.box = await this.controller.boxesController.updateBox(this.box.box_id, { boxName: newName });
                    this.controller.route(location.origin + `/box/edit/${this.box.box_id}`);
                    toggleLoader();
                }
            });
        }
        const buttonDelete = document.querySelector('#submit-delete');
        if (buttonDelete) {
            buttonDelete.addEventListener('click', () => {
                toggleLoader();
                deleteBox(this.cards, this.box, this.controller, Number(this.userId));
                toggleLoader();
                this.controller.route(location.origin + `/account/boxes`);
            });
        }
    }
    deleteClass(el: NodeListOf<Element>) {
        el.forEach((el) => el.classList.remove('active'));
    }
}
