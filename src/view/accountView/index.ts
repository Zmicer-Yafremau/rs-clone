import { Model } from '../../model/index';
import { Controller } from '../../controller';
import { exit } from '../../controller/exit';
import { checkValidation } from '../../controller/check-validation';
import { deleteUser } from '../../controller/delete-user';
import { hideSymbols } from '../../components/hide-symbols';
import { changePrivate } from '../../controller/change-private';
export class AccountView {
    constructor(private controller: Controller, private model: Model, private root: Element) {}

    render(path2: string) {
        if (path2 === 'boxes') {
            this.root.innerHTML = `<div/>Boxes</div>`;
        } else
            this.root.innerHTML = `
        <div class="account">
            <div class="account__wrapper container">
                <div class="row border-bottom flex-wrap" account__header container">
                    <div class="col">
                        <h4 class="">Настройки профиля</h4>
                    </div>
                    <div class="col d-flex justify-content-end align-items-center">
                        <div>
                            <a href="/" class="account__link">Выйти с сайта</a>
                        </div>
                    </div>
                </div>
                <div class="row border-bottom private">
                    <div class="col-4 account__section">
                        <h5 class="">Личные данные</h5>
                    </div>
                    <div class="col-auto">
                        <form class="row private__name-form" novalidate>
                            <div class="col-8 d-flex flex-column justify-content-center align-items-start">
                                <label for="inputNameChange" class="">Ваше имя:</label>
                                <input type="text" class="form-control" id="inputNameChange" placeholder="" minlength="1" required>
                            </div>
                            <div class="col-auto d-flex justify-content-start align-items-end">
                                <button type="submit" class="btn text-secondary bg-none">Сохранить</button>
                            </div>
                            <div class="invalid-feedback">
                                Пожалуйста, введите новое имя.
                            </div>
                        </form>
                        <form class="row private__mail-form" novalidate>
                            <div class="col-8">
                                <label for="inputEmailChange" class="">Ваша почта:</label>
                                <input type="email" class="form-control" id="inputEmailChange" placeholder="" pattern="^.+@[a-zA-Z]{1,}[\\.][a-zA-Z]{1,}" required>
                            </div>
                            <div class="col-auto d-flex justify-content-start align-items-end">
                                <button type="submit" class="btn text-secondary bg-none">Сохранить</button>
                            </div>
                            <div class="invalid-feedback">
                                Пожалуйста, введите новую почту.
                            </div>
                            <div class="private__exist authorization__errors visually-hidden" >
                                Такой пользователь уже существует. Попробуйте другую почту.
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row border-bottom pass">
                    <div class="col-4 account__section">
                        <h5 class="">Пароль</h5>
                    </div>
                    <div class="col-auto">
                        <form class="row pass__form" novalidate>
                            <div class="col authorization__pas">
                                <label for="passChange" class="form-label authorization__label">Пароль:
                                </label>
                                <input type="password" class="form-control authorization__input pass__input"
                                    id="passChange" placeholder="" minlength="5" required>
                                <span class="authorization__icon pass__icon">
                                    <span class="show"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                            fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                            <path
                                                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                            <path
                                                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                        </svg>
                                    </span>
                                    <span class="hide visually-hidden"><svg xmlns="http://www.w3.org/2000/svg"
                                            width="30" height="30" fill="currentColor" class="bi bi-eye-slash"
                                            viewBox="0 0 16 16">
                                            <path
                                                d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                            <path
                                                d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                            <path
                                                d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                        </svg>
                                    </span>
                                </span>
                                <div class="invalid-feedback">
                                    Пожалуйста, введите пароль.(Минимум 5 символов).
                                </div>
                            </div>
                        
                        <div class="pass__exist authorization__errors visually-hidden">
                            Такой пользователь уже существует. Попробуйте другую почту.
                        </div>
                        <div class="mb-3 authorization__pas">
                            <label for="passRepeat" class="form-label authorization__label">Пароль: </label>
                            <input type="password" class="form-control authorization__input pass__repeat"
                                id="passRepeat" placeholder="" minlength="5" required>
                            <span class="authorization__icon pass__repeat-icon">
                                <span class="show"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                        fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                        <path
                                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                        <path
                                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                    </svg></span>
                                <span class="hide visually-hidden"><svg xmlns="http://www.w3.org/2000/svg" width="30"
                                        height="30" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                                        <path
                                            d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                        <path
                                            d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                        <path
                                            d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                    </svg></span>
                            </span>
                        </div>
                        <div class="reg_equal authorization__errors visually-hidden">
                            Пароли не совпадают.
                        </div>
                        <div class="col d-flex justify-content-end align-items-end">
                            <button type="submit" class="btn text-secondary bg-none">Сохранить</button>
                        </div>
                    </form>
                    </div>

                </div>
                <div class="row border-bottom delete">
                    <div class="col-4 account__section">
                        <h5 class="">Удаление профиля</h5>
                    </div>
                    <form class="col-auto delete__form" novalidate>
                        <div class="d-flex flex-column justify-content-center align-items-start">
                            <label for="inputDel" class="text-secondary">Для подтверждения введите: <b> Удалить профиль</b></label>
                            <input type="text" class="form-control" id="inputDel">
                        </div>
                        <div class="d-flex justify-content-end visually-hidden">
                            <button type="submit" class="btn text-secondary bg-none">Удалить</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>`;
    }
    addListeners() {
        const EXIT = document.getElementsByClassName('account__link')[0] as HTMLAnchorElement;
        const DELETE__INPUT = document.getElementById('inputDel') as HTMLInputElement;
        const DELETE__FORM = document.getElementsByClassName('delete__form')[0] as HTMLFormElement;
        const DELETE__DIV = DELETE__FORM.children[1] as HTMLDivElement;
        const DELETE__BUTTON = DELETE__DIV.children[0] as HTMLButtonElement;
        EXIT.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            exit();
        });
        DELETE__BUTTON.addEventListener('click', async (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            await deleteUser();
        });
        DELETE__INPUT.addEventListener('input', () => {
            if (DELETE__INPUT.value === 'Удалить профиль') {
                DELETE__DIV.classList.remove('visually-hidden');
            }
        });
        const P_NAME_FORM = document.getElementsByClassName('private__name-form')[0] as HTMLFormElement;
        const P_MAIL_FORM = document.getElementsByClassName('private__mail-form')[0] as HTMLFormElement;
        changePrivate(P_NAME_FORM);
        changePrivate(P_MAIL_FORM);
    }
}
