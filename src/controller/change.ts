import { USR_STATE } from '../db/usr-state';
import { switchHeader } from '../view/mainView/switch-header';
import { animateNavigation } from '../view/mainView/animate-navigation';
import { Controller } from '.';
import { Model } from '../model';
//import { View } from '../view';
export async function change(form: HTMLFormElement, controller: Controller, model: Model) {
    form.addEventListener(
        'submit',
        async (event) => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                event.stopPropagation();
                const USR = model.authorizationModel;
                const ID = localStorage.id;
                const FORM_TYPE = form.classList[1].split('__')[1];
                const SAVED = document.getElementsByClassName('private__saved')[0] as HTMLDivElement;
                const PASS_SAVED = document.getElementsByClassName('pass__saved')[0] as HTMLDivElement;
                if (FORM_TYPE === 'name-form') {
                    const NAME_INPUT = document.getElementById('inputNameChange') as HTMLInputElement;
                    const NAME = NAME_INPUT.value.trim();
                    await USR.changeName(ID, NAME);
                    switchHeader(NAME, controller, model);
                    USR_STATE.name = NAME;
                    //SAVED.classList.add('active');
                    animateNavigation(0, 80, 2.5, SAVED);
                    setTimeout(() => {
                        //SAVED.classList.remove('active');
                        animateNavigation(80, 0, -2.5, SAVED);
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
                        USR_STATE.email = MAIL;
                        //SAVED.classList.add('active');
                        animateNavigation(0, 80, 2.5, SAVED);
                        setTimeout(() => {
                            //SAVED.classList.remove('active');
                            animateNavigation(80, 0, -2.5, SAVED);
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
                        //animateNavigation(80, 0, -2.5, PASS_SAVED);
                        setTimeout(() => {
                            PASS_SAVED.classList.remove('active');
                            //animateNavigation(80, 0, -2.5, PASS_SAVED);
                        }, 3000);
                    } else PASS_EQUAL.classList.remove('visually-hidden');
                }
            }
            form.classList.add('was-validated');
        },
        false
    );
}
