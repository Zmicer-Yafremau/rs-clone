import { Box } from '../model/box';
export function checkNewBox(form: HTMLFormElement, div: HTMLDivElement) {
    form.addEventListener(
        'submit',
        async (event) => {
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
                    const boxName = INPUT.value;
                    let invitedKey = '';
                    const adminName = localStorage.name;
                    const year = '2023';
                    const adminId = +localStorage.id;
                    const cardsId: number[] = [];
                    const isDraw = false;
                    const boxImg = VALIDATE_PIC.classList[0];
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
                    location.replace(`${location.origin}/account/boxes`);
                } else {
                    ERR.classList.remove('visually-hidden');
                }
            }
            form.classList.add('was-validated');
        },
        false
    );
}
