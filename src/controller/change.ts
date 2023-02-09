import { Authorization } from '../model/authorization';
import { switchHeader } from '../view/mainView/switch-header';
import { USR_STATE } from '../db/usr-state';
export async function change(form: HTMLFormElement) {
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
                const ID = localStorage.id;
                const FORM_TYPE = form.classList[1].split('__')[1];
                console.log(FORM_TYPE);
                const INPUTS = (document.getElementsByClassName(
                    `${FORM_TYPE}__input`
                ) as unknown) as NodeListOf<HTMLInputElement>;
                const SAVED = document.getElementsByClassName('private__saved')[0] as HTMLDivElement;
                const PASS_SAVED = document.getElementsByClassName('pass__saved')[0] as HTMLDivElement;
                if (FORM_TYPE === 'name-form') {
                    const NAME_INPUT = document.getElementById('inputNameChange') as HTMLInputElement;
                    const NAME = NAME_INPUT.value;
                    console.log('usr', USR_STATE);
                    const res = await USR.changeName(ID, NAME);
                    switchHeader(NAME);
                    SAVED.classList.add('active');
                    setTimeout(() => {
                        SAVED.classList.remove('active');
                    }, 3000);
                } else if (FORM_TYPE === 'mail-form') {
                    const MAIL_INPUT = document.getElementById('inputEmailChange') as HTMLInputElement;
                    const MAIL = MAIL_INPUT.value;
                    const res = await USR.changeEmail(ID, MAIL);
                    const USER_EXIST = document.getElementsByClassName('private__exist')[0] as HTMLDivElement;
                    if (res === 'User with this email already exist!') {
                        USER_EXIST.classList.remove('visually-hidden');
                    } else {
                        USER_EXIST.classList.add('visually-hidden');
                        SAVED.classList.add('active');
                        setTimeout(() => {
                            SAVED.classList.remove('active');
                        }, 3000);
                    }
                } else if (FORM_TYPE === 'form') {
                    const PASS_EQUAL = document.getElementsByClassName('pass_equal')[0] as HTMLDivElement;
                    const PASS_CHANGE = document.getElementById('passChange') as HTMLInputElement;
                    const PASS_REPEAT = document.getElementById('passRepeat') as HTMLInputElement;
                    if (PASS_CHANGE.value === PASS_REPEAT.value) {
                        await USR.changePassword(ID, PASS_REPEAT.value);
                        PASS_EQUAL.classList.add('visually-hidden');
                        PASS_SAVED.classList.add('active');
                        setTimeout(() => {
                            PASS_SAVED.classList.remove('active');
                        }, 3000);
                    } else PASS_EQUAL.classList.remove('visually-hidden');
                }
            }
            form.classList.add('was-validated');
        },
        false
    );
}
