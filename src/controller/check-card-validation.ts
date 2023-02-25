import { USR_STATE } from '../db/usr-state';
import { Model } from '../model';
import { Controller } from '.';
export function checkNewCard(form: HTMLFormElement, div: HTMLDivElement, controller: Controller, model: Model) {
    form.addEventListener(
        'submit',
        async (event) => {
            const SUBMIT_BUTTON = document.getElementsByClassName('ucard__btn')[0] as HTMLButtonElement;
            SUBMIT_BUTTON.setAttribute('disabled', '');
            SUBMIT_BUTTON.innerHTML = `  <span class="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
            Создаю...`;
            const ERR = document.getElementsByClassName('ucard__err')[0] as HTMLDivElement;
            ERR.classList.add('visually-hidden');
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                event.stopPropagation();
                const VALIDATE_PIC = Array.from(div.children).find((el) => {
                    return el.classList.contains('active');
                });
                if (VALIDATE_PIC) {
                    const CARD = model.cardModel;
                    const U_BOX = model.userBoxesModel;
                    const INPUT = document.getElementById('ucardInput') as HTMLInputElement;
                    const WISHES_INPUT = document.getElementById('wishesInput') as HTMLInputElement;
                    const userName = INPUT.value;
                    const wishes = WISHES_INPUT.value;
                    const wardId = null;
                    const wardGift = false;
                    const cardGift = false;
                    const userId = USR_STATE.id;
                    const boxId = +localStorage.boxId;
                    const cardImg = VALIDATE_PIC.children[0].classList[0].trim();
                    const U_BOX_OBJ = await U_BOX.getByUserId(userId);
                    const BOX_CARDS = await CARD.getCardsOfBox(boxId);
                    const isUserCard = BOX_CARDS.map((card) => card.user_id).includes(userId);
                    if (!U_BOX_OBJ[0].user_boxes.includes(boxId)) {
                        const NEW_BOX_ARR = U_BOX_OBJ[0]['user_boxes'];
                        NEW_BOX_ARR.push(boxId);
                        await U_BOX.update(U_BOX_OBJ[0].id, NEW_BOX_ARR, U_BOX_OBJ[0].account_id);
                    }
                    if (!isUserCard) {
                        const phone = USR_STATE.phonenumber;
                        const email = USR_STATE.email;
                        const NEW_CARD = await CARD.create({
                            userName,
                            wardId,
                            cardImg,
                            wishes,
                            boxId,
                            userId,
                            phone,
                            wardGift,
                            cardGift,
                            email,
                        });
                        const BOX = model.boxModel;
                        const BOX_OBJ = await BOX.getByBoxId(localStorage.boxId);
                        const CARD_ARR = BOX_OBJ.cards_id;
                        CARD_ARR.push(NEW_CARD.card_id);
                        const id = localStorage.boxId;
                        const cardsId = CARD_ARR;
                        await BOX.update(id, { cardsId });
                    }
                    localStorage.invite = '';
                    controller.route(model.route.origin + `/box/${boxId}`);
                } else {
                    ERR.classList.remove('visually-hidden');
                    SUBMIT_BUTTON.innerHTML = `Создать`;
                    SUBMIT_BUTTON.removeAttribute('disabled');
                }
            }
            form.classList.add('was-validated');
            SUBMIT_BUTTON.innerHTML = `Создать`;
            SUBMIT_BUTTON.removeAttribute('disabled');
        },
        false
    );
}
