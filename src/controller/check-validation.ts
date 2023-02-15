import { Authorization } from '../model/authorization';
import { UserBoxes } from '../model/userBoxes';
import { renderCardReg } from '../view/newBoxView/renderCardReg';
import { Card } from '../model/card';

export function checkValidation(form: HTMLFormElement) {
    form.addEventListener(
        'submit',
        async (event) => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                event.stopPropagation();
                const USR = new Authorization();
                const FORM_TYPE = form.classList[1].split('_')[0];
                const INPUTS = (document.getElementsByClassName(
                    `${FORM_TYPE}__input`
                ) as unknown) as NodeListOf<HTMLInputElement>;
                if (FORM_TYPE === 'reg') {
                    const USER_EXIST = document.getElementsByClassName('reg__exist')[0] as HTMLDivElement;
                    const NAME = INPUTS[0].value;
                    const PHONE = INPUTS[1].value;
                    const MAIL = INPUTS[2].value;
                    const PASS = INPUTS[3].value;
                    const res = await USR.create(NAME, MAIL, PHONE, PASS);
                    if (res) {
                        const USR_BOXES = await new UserBoxes();
                        const ID = localStorage.id;
                        await USR_BOXES.create([], ID);
                        if (localStorage.inviteKey) renderCardReg();
                        else location.replace(location.origin);
                    } else USER_EXIST.classList.remove('visually-hidden');
                } else if (FORM_TYPE === 'log') {
                    const USER_EXIST = document.getElementsByClassName('log__exist')[0] as HTMLDivElement;
                    const MAIL = INPUTS[0].value;
                    const PASS = INPUTS[1].value;
                    const res = await USR.login(MAIL, PASS);
                    if (res) {
                        if (localStorage.inviteKey) {
                            const ID = +localStorage.id;
                            const U_BOX = new UserBoxes();
                            const U_BOX_OBJ = await U_BOX.getByUserId(ID);
                            if (U_BOX_OBJ[0].user_boxes.includes(+localStorage.boxId)) {
                                const U_CARD = new Card();
                                const U_CARD_OBJ = await U_CARD.getCardsOfBox(localStorage.boxId);
                                const CHECK_CARDS = U_CARD_OBJ.some((el) => el.user_id === ID);
                                console.log(U_CARD_OBJ);
                                if (CHECK_CARDS) location.replace(`${location.origin}/box/${localStorage.boxId}`);
                            }
                            renderCardReg();
                        }
                        location.replace(location.origin);
                    } else USER_EXIST.classList.remove('visually-hidden');
                }
            }
            form.classList.add('was-validated');
        },
        false
    );
}
