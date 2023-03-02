import { Model } from '../../model/index';
import { Controller } from '../../controller';
import { exit } from '../../controller/exit';
import { deleteUser } from '../../controller/delete-user';
import { hideSymbols } from '../../components/hide-symbols';
import { change } from '../../controller/change';
import { boxImages } from '../../db/boxesImg';
import { getEnding } from '../../utils/utils';
import { errorCats } from '../../db/errorCats';
import { USR_STATE } from '../../db/usr-state';

export class AccountView {
    constructor(private controller: Controller, private model: Model, private root: Element) {}
    async render(path2: string) {
        const userBoxes = await this.controller.boxesController.getBoxes();
        const years: string[] = [];
        const userId: number | undefined = USR_STATE.id;
        if (userBoxes && userBoxes.length > 0) {
            userBoxes.forEach((boxes) => (!years.includes(boxes.year) ? years.push(boxes.year) : null));
        }
        if (path2 === 'boxes') {
            this.root.innerHTML = `<div class="boxes log center">
            <div class="menu__wrapper">
                <div class="boxes__view"><p>Мои Коробки</p></div>
                <a class="nav__link" href="/box/new"
                    ><div class="toggle__wrapper">
                        <div class="plus">
                            <span class="svg plus" style="width: 44px; height: 44px; background: none"
                                ><svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    style="width: 25px; height: 25px; background: none">
                                    <path
                                        d="M12 6v12M6 12h12"
                                        stroke="#333640"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></path></svg
                            ></span>
                        </div></div></a>
            </div>
            <section class="boxes__section">
            ${
                userBoxes && years.length > 0
                    ? years
                          .map(
                              (year) => `
            <div class="boxes__year">
                <h4>${year}</h4>
            </div>
            <ul class="boxes__list">
                ${userBoxes
                    .filter((boxes) => boxes.year === year)
                    .map(
                        (box) => `
                <li class="box__wrapper" id=${box.box_name
                    .split(' ')
                    .map((item) => item[0].toUpperCase() + item.slice(1, item.length))
                    .join('')} data-id=${box.box_id}>
                    <div class="box-img">${boxImages[box.box_img]}</div>
                    <div class="box__info-wrapper">
                        <div class="box__name">
                            <span class="title">${box.box_name}</span>
                        </div>
                        <div class="box__bottom">
                            <span class="txt"
                                >${box.cards_id.length} ${getEnding(
                            box.cards_id.length,
                            'участник',
                            'участника',
                            'участников'
                        )}
                            </span>
                            <div class="dot"></div>
                            <span class="txt"
                                >${userId && box.admin_id === Number(userId) ? 'Вы организатор' : 'Вы участник'}</span
                            >
                            <div class="dot"></div>
                            <span class="txt">${box.is_draw ? 'Жеребьевка проведена' : 'Жеребьевка не проведена'}</span>
                        </div>
                    </div>
                </li>`
                    )
                    .join('')}
               </ul>`
                          )
                          .join('')
                    : `<div class="box__null">
                    ${errorCats.noWard}
                   <div> <p>Пока что коробок нет</p>
                    <p>Создайте свою первую коробку</p></div>
                    <button id="create" type="button" class="btn main__button bg-light active">
                     Создать коробку</button>
                     </div>`
            }     
            </section>
        </div>`;
        } else
            this.root.innerHTML = `<div class="account">
        <div class="account__wrapper container">
            <div class="row flex-wrap" account__header container">
                <div class="col">
                    <h4 class="">Настройки профиля</h4>
                </div>
                <div class="col d-flex justify-content-end align-items-center">
                    <div>
                        <a class="account__link">Выйти с сайта</a>
                    </div>
                </div>
            </div>
            <div class="row border-top private position-relative overflow-hidden">
                <div class="col-4 account__section">
                    <h5 class="">Личные данные</h5>
                </div>
                <div class="col-5 account__container">
                    <form class="row private__name-form mt-3" novalidate>
                        <div class="col d-flex flex-column justify-content-center align-items-start">
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
                        <div class="col d-flex flex-column justify-content-center align-items-start">
                            <label for="inputEmailChange" class="">Ваша почта:</label>
                            <input type="email" class="form-control" id="inputEmailChange" placeholder="" pattern="^.+@[a-zA-Z]{1,}[\\.][a-zA-Z]{1,}" required>
                        </div>
                        <div class="col-auto d-flex justify-content-start align-items-end">
                            <button type="submit" class="btn text-secondary bg-none">Сохранить</button>
                        </div>
                        <div class="invalid-feedback">
                            Пожалуйста, введите новую почту.
                        </div>
                        <div class="private__exist authorization__errors visually-hidden mt-3 col-8" >
                            Такой пользователь уже существует. Попробуйте другую почту.
                        </div>
                    </form>
                    <div class="private__saved mt-3 col-8 bg-accept position-absolute bg-success text-center bg-opacity-10" >
                               Сохранено
                    </div>
                </div>
            </div>
            <div class="row border-top pass position-relative overflow-hidden">
                <div class="col-4 account__section">
                    <h5 class="">Пароль</h5>
                </div>
                <div class="col-5 account__container">
                    <form class="row pass__form mt-3" novalidate>
                        <div class="col authorization__pas">
                            <label for="passChange" class="form-label authorization__label">Введите пароль:
                            </label>
                            <input type="password" class="form-control authorization__input pass__input"
                                id="passChange" placeholder="" minlength="5" required>
                            <span class="authorization__icon pass__change-icon">
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
                    <div class="mb-3 authorization__pas mt-3">
                        <label for="passRepeat" class="form-label authorization__label">Повторите пароль: </label>
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
                    <div class="pass_equal authorization__errors visually-hidden">
                        Пароли не совпадают.
                    </div>
                    <div class="pass__saved mt-3 col-8 bg-accept position-absolute bg-success text-center bg-opacity-10" >
                        Сохранено
                    </div>
                    <div class="col d-flex justify-content-end align-items-end">
                        <button type="submit" class="btn text-secondary bg-none">Сохранить</button>
                    </div>
                </form>
                </div>
            </div>
            <div class="row border-top delete">
                <div class="col-4 account__section">
                    <h5 class="">Удаление профиля</h5>
                </div>
                <form class="col-auto delete__form mt-3" d-flex novalidate>
                    <div class="d-flex flex-column justify-content-center align-items-start">
                        <label for="inputDel" class="text-secondary">Для подтверждения введите: <b> Удалить профиль</b></label>
                        <input type="text" class="form-control mt-1" id="inputDel">
                    </div>
                    <div class="delete__btn d-flex justify-content-end mt-3">
                        <button type="submit" class="btn text-secondary bg-none visually-hidden">Удалить</button>
                    </div>
                    <div class="delete__error-part delete__error authorization__errors visually-hidden mt-3">
                         Невозможно удалить профиль, есть коробки в которых вы учавствуете.
                         Обратитесь к <span class="account__admins"></span> для того, что бы Вас удалили.
                    </div>
                    <div class="delete__error-admin delete__error authorization__errors visually-hidden mt-3">
                    Невозможно удалить профиль, сначала удалите свои коробки.
               </div>
                </form>
            </div>
        </div>
    </div>`;
    }

    addListeners() {
        if (location.pathname.includes('/account/boxes')) {
            const boxesList = document.querySelectorAll('.boxes__list');
            if (boxesList) {
                boxesList.forEach((list) =>
                    list.addEventListener('click', (e) => {
                        const target = e.target as HTMLElement;
                        if (target && target.closest('LI')) {
                            const box_id = target.closest('LI')?.getAttribute('data-id');
                            this.controller.route(this.model.route.origin + `/box/${box_id}`);
                        }
                    })
                );
            }
            const CREATE__BUTTON = document.getElementById('create');
            if (CREATE__BUTTON) {
                CREATE__BUTTON.addEventListener('click', () =>
                    this.controller.route(this.model.route.origin + `/box/new`)
                );
            }
        }
        if (location.pathname !== '/account/boxes') {
            const EXIT = document.getElementsByClassName('account__link')[0] as HTMLAnchorElement;
            const DELETE__INPUT = document.getElementById('inputDel') as HTMLInputElement;

            const DELETE__FORM = document.getElementsByClassName('delete__form')[0] as HTMLFormElement;
            if (DELETE__FORM) {
                const DELETE__DIV = DELETE__FORM.children[1] as HTMLDivElement;
                const DELETE__BUTTON = DELETE__DIV.children[0] as HTMLButtonElement;
                const PASS_CHANGE = document.getElementById('passChange') as HTMLInputElement;
                const PASS_REPEAT = document.getElementById('passRepeat') as HTMLInputElement;
                const CHANGE_ICONS = document.getElementsByClassName(`pass__change-icon`)[0] as HTMLSpanElement;
                const REPEAT_ICONS = document.getElementsByClassName(`pass__repeat-icon`)[0] as HTMLSpanElement;

                EXIT.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    exit(this.controller, this.model);
                });
                DELETE__BUTTON.addEventListener('click', async (event) => {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    await deleteUser(this.controller, this.model);
                });
                DELETE__INPUT.addEventListener('input', () => {
                    if (DELETE__INPUT.value === 'Удалить профиль') {
                        DELETE__BUTTON.classList.remove('visually-hidden');
                    } else DELETE__BUTTON.classList.add('visually-hidden');
                });
                const P_NAME_FORM = document.getElementsByClassName('private__name-form')[0] as HTMLFormElement;
                const P_MAIL_FORM = document.getElementsByClassName('private__mail-form')[0] as HTMLFormElement;
                const PASS_FORM = document.getElementsByClassName('pass__form')[0] as HTMLFormElement;
                change(P_NAME_FORM);
                change(P_MAIL_FORM);
                change(PASS_FORM);
                hideSymbols(PASS_CHANGE, CHANGE_ICONS);
                hideSymbols(PASS_REPEAT, REPEAT_ICONS);
            }
        }
    }
}
