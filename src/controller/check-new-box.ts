import { Box } from '../model/box';
import { UserBoxes } from '../model/userBoxes';
import { renderCardReg } from '../view/newBoxView/renderCardReg';
export function checkNewBox(form: HTMLFormElement, div: HTMLDivElement) {
    form.addEventListener(
        'submit',
        async (event) => {
            const SUBMIT_BUTTON = document.getElementsByClassName('box__sub-btn')[0] as HTMLButtonElement;
            SUBMIT_BUTTON.setAttribute('disabled', '');
            const ERR = document.getElementsByClassName('box__err')[0] as HTMLDivElement;
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
                    const BOX = new Box();
                    const INPUT = document.getElementById('boxInput') as HTMLInputElement;
                    const boxName = INPUT.value.trim();
                    let invitedKey = '';
                    const adminName = localStorage.name;
                    const year = '2023';
                    const adminId = +localStorage.id;
                    const cardsId: number[] = [];
                    const isDraw = false;
                    const boxImg = VALIDATE_PIC.children[0].classList[1].trim();
                    console.log(boxImg);
                    for (let i = 0; i < 5; i++) {
                        invitedKey += `${Math.floor(Math.random() * 10)}`;
                    }
                    const BOX_OBJ = await BOX.create(
                        boxName,
                        boxImg,
                        year,
                        invitedKey,
                        cardsId,
                        adminId,
                        isDraw,
                        adminName
                    );
                    const USR_BOX = new UserBoxes();
                    const BOX_GET = await USR_BOX.getByUserId(adminId);
                    const NEW_BOX_ARR = await BOX_GET[0]['user_boxes'];
                    NEW_BOX_ARR.push(BOX_OBJ.box_id);
                    await USR_BOX.update(BOX_GET[0].id, NEW_BOX_ARR, BOX_GET[0].account_id);
                    localStorage.boxId = BOX_OBJ.box_id;
                    SUBMIT_BUTTON.removeAttribute('disabled');
                    renderCardReg();
                } else {
                    ERR.classList.remove('visually-hidden');
                    SUBMIT_BUTTON.removeAttribute('disabled');
                }
            }
            form.classList.add('was-validated');
            SUBMIT_BUTTON.removeAttribute('disabled');
        },
        false
    );
}
