import { Card } from '../model/card';
import { UserBoxes } from '../model/userBoxes';
import { Box } from '../model/box';
export function checkNewCard(form: HTMLFormElement, div: HTMLDivElement) {
    form.addEventListener(
        'submit',
        async (event) => {
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
                    const CARD = new Card();
                    const U_BOX = new UserBoxes();
                    const INPUT = document.getElementById('ucardInput') as HTMLInputElement;
                    const WISHES_INPUT = document.getElementById('wishesInput') as HTMLInputElement;
                    const userName = INPUT.value;
                    const wishes = WISHES_INPUT.value;
                    const wardId = null;
                    const randomKey = '';
                    const userId = +localStorage.id;
                    const boxId = +localStorage.boxId;
                    const cardImg = VALIDATE_PIC.children[0].classList[0].trim();
                    const U_BOX_OBJ = await U_BOX.getByUserId(userId);
                    if (!U_BOX_OBJ[0].user_boxes.includes(boxId)) {
                        const NEW_BOX_ARR = await U_BOX_OBJ[0]['user_boxes'];
                        NEW_BOX_ARR.push(localStorage.boxId);
                        await U_BOX.update(U_BOX_OBJ[0].id, NEW_BOX_ARR, U_BOX_OBJ[0].account_id);
                    }
                    const NEW_CARD = await CARD.create({ userName, wardId, cardImg, randomKey, wishes, boxId, userId });
                    const BOX = new Box();
                    const BOX_OBJ = await BOX.getByBoxId(localStorage.boxId);
                    const CARD_ARR = BOX_OBJ.cards_id;
                    CARD_ARR.push(NEW_CARD.card_id);
                    const id = localStorage.boxId;
                    const cardsId = CARD_ARR;
                    await BOX.update(id, { cardsId });
                    location.replace(location.origin + '/account/boxes');
                } else {
                    ERR.classList.remove('visually-hidden');
                }
            }
            form.classList.add('was-validated');
        },
        false
    );
}
