import { Model } from '../../model/index';
import { Controller } from '../../controller';
import { addBoxPics } from '../newBoxView/add-box-pics';
import { copy, toggleLoader } from '../../utils/utils';
import { IBoxReq, ICardReq } from '../../types/requestTypes';
import { deleteBox, drawRandomCards, redrawRandomCards } from '../boxView/boxManage';

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
            const placeToInsert = document.querySelector('.box__view');
            const menuItem = document.querySelector('#num-1');
            const menuItemSlider = document.querySelector('.toggle-menu-item--slider.num-1');
            if (menuItemSlider && menuItem) {
                menuItem.classList.add('active');
                menuItemSlider.classList.add('active');
            }
            const div = document.createElement('div');
            div.classList.add('box__edit', 'box');
            div.innerHTML = `<div class="edit__wrapper container">
            <div class="section">
                <h4>Настройки коробки</h4>
            </div>
        
            <div>
                <div class="section">
                    <div class="col-4"><h5 class="">Название</h5></div>
                    <div class="check-section col-5 input">
                        <div class="input-box">
                            <label for="inputNameBox">Название:</label>
                            <input type="text" class="form-control" id="inputNameBox" placeholder="" minlength="1" />
                        </div>
                        <button id="submitBoxName" type="button" class="btn text-secondary bg-none">Сохранить</button>
                    </div>
                </div>
                <div class="section">
                    <div class="col-4">
                        <h5 class="">Обложка</h5>
                    </div>
        
                    <div class="check-section col-5">
                        <div class="box__pictures d-flex center"></div>
                        <button id="submitBoxImg" type="button" class="btn text-secondary bg-none">Сохранить</button>
                    </div>
                </div>
            </div>
            <div class="section">
                <div class="col-4"><h5 class="">Пригласить по ссылке</h5></div>
                <div class="check-section col-5 link">
                    <p>
                        Скопируйте ссылку ниже и отправьте её своим друзьям. После перехода по ссылке, участники смогут создать
                        карточки для участия самостоятельно.
                    </p>
                    <p class="link-copy">Ccылка-приглашение (кликните, чтобы скопировать):</p>
                    <input
                        id="copy-link"
                        type="text"
                        class="copy-link-input"
                        data-tippy-arrow="false"
                        data-tippy-content="Ссылка скопирована"
                        data-tippy-placement="bottom-start"
                        ,
                        readonly
                    />
                </div>
            </div>
            <div class="section">
                <div class="col-4"><h5 class="">Жеребьевка</h5></div>
                <div class="check-section col-5">
                    ${
                        !this.box.is_draw && this.box.cards_id.length >= 3
                            ? `<button
                        id="draw"
                        type="button"
                        class="btn main__button bg-light active"
                    >
                        Провести жеребьевку</button
                    >`
                            : !this.box.is_draw && box.cards_id.length < 3
                            ? `
                    <div class="text"><p>Чтобы провести жеребьевку, вам необходимо добавить еще хотя бы двух друзей.</p></div>
                    `
                            : `<button id="redraw" type="button" class="btn main__button bg-light active">Сбросить жеребьевку</button
                    >`
                    }
                </div>
            </div>
            <div class="section">
                <div class="col-4"><h5 class="">Удалить коробку</h5></div>
                <div class="check-section col-5">
                    <p class="warn"><strong>Важно:</strong> вы не сможете вернуть коробку назад после удаления.</p>
                    <label for="inputDeleteBox" class="">Для подтверждения введите: <strong>Удалить коробку</strong></label>
                    <input type="text" class="form-control" id="inputDeleteBox" placeholder="" minlength="1" />
                    <button id="submit-delete" type="submit" class="btn bg-none">Удалить</button>
                </div>
            </div>
        </div>
              
        `;
            placeToInsert ? placeToInsert.append(div) : null;
            addBoxPics();
        }
    }
    addListeners() {
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
                    this.controller.route(location.origin + `/box/${this.box.box_id}/edit`);
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
                    this.controller.route(location.origin + `/box/${this.box.box_id}/edit`);
                    toggleLoader();
                }
            });
        }
        const buttonDelete = document.querySelector('#submit-delete');
        if (buttonDelete) {
            buttonDelete.addEventListener('click', async () => {
                toggleLoader();
                await deleteBox(this.cards, this.box, this.controller, Number(this.userId));
                toggleLoader();
                this.controller.route(location.origin + `/account/boxes`);
            });
        }
    }
    deleteClass(el: NodeListOf<Element>) {
        el.forEach((el) => el.classList.remove('active'));
    }
}
