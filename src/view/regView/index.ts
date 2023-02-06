import { Model } from '../../model/index';
import { Controller } from '../../controller';
import { checkValidation } from '../../controller/check-validation';
import { hideSymbols } from '../../components/hide-symbols';
export class RegView {
    constructor(private controller: Controller, private model: Model, private root: Element) {}

    render() {
        this.root.innerHTML = `<div class="reg authorization center">
        <div class="authorization__wrapper center">
            <h1>Регистрация</h1>
            <div class="authorization__switch">Уже зарегистрированы? <a href="/login" class="nav__link"> Войти на сайт</a></div>
            <form class="authorization__form reg__form mt-3" novalidate>
            <div class="mb-3">
            <label for="regName" class="form-label authorization__label">Имя: </label>
            <input type="text" class="form-control authorization__input reg__input" id="regName"
                placeholder="" minlength="1" " required>
                <div class="valid-feedback">
                Cпасибо!
              </div>
              <div class="invalid-feedback">
              Пожалуйста, введите имя.
            </div>
        </div>
                <div class="mb-3">
                    <label for="regTel" class="form-label authorization__label">Телефон: </label>
                    <input type="tel" class="form-control authorization__input reg__input" id="regTel"
                        placeholder="" pattern="[0-9]{9,}" required>
                        <div class="valid-feedback">
                        Cпасибо!
                      </div>
                      <div class="invalid-feedback">
                      Пожалуйста, введите номер телефона (Должен быть минимум 9 цифр без "+").
                    </div>
                </div>
                <div class="mb-3">
                    <label for="regMail" class="form-label authorization__label">Почта: </label>
                    <input type="email" class="form-control authorization__input reg__input" id="regMail"
                        placeholder="" pattern="^.+@[a-zA-Z]{1,}[\\.][a-zA-Z]{1,}"
                        required>
                        <div class="valid-feedback">
                        Cпасибо!
                      </div>
                        <div class="invalid-feedback">
                        Пожалуйста, введите почту.
                      </div>
                </div>
                <div class="mb-3 authorization__pas">
                    <label for="regPass" class="form-label authorization__label">Пароль: </label>
                    <input type="password" class="form-control authorization__input reg__pass reg__input" id="regPass"
                        placeholder="" minlength="5" required>
                        <span class="authorization__icon reg__icon">
                    <span class="show"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                      </svg></span>
                      <span class="hide visually-hidden"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                      </svg></span>
                      </span>
                      <div class="valid-feedback">
                      Cпасибо!
                    </div>
                      <div class="invalid-feedback">
                      Пожалуйста, введите пароль.(Минимум 5 символов).
                    </div>
                </div>
                <div class="reg__exist authorization__errors visually-hidden" >
                    Такой пользователь уже существует. Попробуйте другую почту.
                </div>
                <button type="submit" class="btn main__button active authorization__btn center mt-4">Зарегестрироваться</button>
            </form>
        </div>
    </div>`;
    }
    addListeners() {
        const FORM = document.getElementsByClassName('reg__form')[0] as HTMLFormElement;
        const PASS_INPUT = document.getElementsByClassName('reg__pass')[0] as HTMLInputElement;
        const PASS_ICONS = document.getElementsByClassName('reg__icon')[0] as HTMLInputElement;
        hideSymbols(PASS_INPUT, PASS_ICONS);
        checkValidation(FORM);
    }
}
