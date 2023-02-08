import { Authorization } from '../model/authorization';
import { switchHeader } from '../view/mainView/switch-header';
export async function changePrivate(form: HTMLFormElement) {
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
                const USR_OBJ = await USR.get(localStorage.token);
                const FORM_TYPE = form.classList[1].split('__')[1];
                console.log(FORM_TYPE);
                console.log('us', USR_OBJ);
                const INPUTS = (document.getElementsByClassName(
                    `${FORM_TYPE}__input`
                ) as unknown) as NodeListOf<HTMLInputElement>;
                if (FORM_TYPE === 'name-form') {
                    console.log('123');
                    const NAME_INPUT = document.getElementById('inputNameChange') as HTMLInputElement;
                    const NAME = NAME_INPUT.value;
                    const PHONE = USR_OBJ[0].phonenumber;
                    const MAIL = USR_OBJ[0].email.trim();
                    const PASS = USR_OBJ[0].password.trim();
                    const ID = USR_OBJ[0].id;
                    const res = await USR.update(ID, NAME, MAIL, PHONE, PASS);
                    switchHeader(NAME);
                } else if (FORM_TYPE === 'mail-form') {
                    console.log('123456');
                    const MAIL_INPUT = document.getElementById('inputMailChange') as HTMLInputElement;
                    const MAIL = MAIL_INPUT.value;
                    const PHONE = USR_OBJ[0].phonenumber;
                    const NAME = USR_OBJ[0].name;
                    const PASS = USR_OBJ[0].password;
                    const ID = USR_OBJ[0].id;
                    const res = await USR.update(ID, NAME, MAIL, PHONE, PASS);
                    const USER_EXIST = document.getElementsByClassName('private__exist')[0] as HTMLDivElement;
                    if (res === 'User already exist!') USER_EXIST.classList.remove('visually-hidden');
                }
            }
            form.classList.add('was-validated');
        },
        false
    );
}
