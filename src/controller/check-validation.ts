import { USR_STATE } from '../db/usr-state';
import { Authorization } from '../model/authorization';
import { UserBoxes } from '../model/userBoxes';
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
                        console.log(res);
                        const ID = localStorage.id;
                        const USR_BOX_CONNECT = USR_BOXES.create([], ID);
                        USR_STATE.password = PASS;
                        console.log(USR_BOX_CONNECT);
                        location.replace(location.origin);
                    } else USER_EXIST.classList.remove('visually-hidden');
                } else if (FORM_TYPE === 'log') {
                    const USER_EXIST = document.getElementsByClassName('log__exist')[0] as HTMLDivElement;
                    const MAIL = INPUTS[0].value;
                    const PASS = INPUTS[1].value;
                    const res = await USR.login(MAIL, PASS);
                    if (res) {
                        USR_STATE.password = PASS;
                        location.replace(location.origin);
                    } else USER_EXIST.classList.remove('visually-hidden');
                }
            }
            form.classList.add('was-validated');
        },
        false
    );
}
