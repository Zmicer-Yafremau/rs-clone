import { Model } from '../../model/index';
import { Controller } from '../../controller';
import { fillAccordeon } from './fill-accordeon';
export class FaqView {
    constructor(private controller: Controller, private model: Model, private root: Element) {}

    render() {
        this.root.innerHTML = `<div class="faq">
        <div class="faq__wrapper">
        <section class="quastions container-fluid">
                <h3>Вопросы и ответы про сервис</h3>
                <div class="faq__buttons mt-5">
                <button type="button" class="btn main__button faq__button bg-light text-secondary active">Общие вопросы</button>
                <button type="button" class="btn main__button faq__button bg-light text-secondary">Для организаторов</button>
                <button type="button" class="btn main__button faq__button bg-light text-secondary">О сервисе</button>
                </div>
                <label for="faqInput" class="form-label text-secondary mt-3">Поиск по вопросам</label>
                <input type="text" class="form-control" id="faqInput" placeholder="">
                <div class="accordion mt-3" id="accordionFaq">
                </div>
         </section>
        <section class="extra-faq container-fluid between">
                <div>
                    <h4>Остались вопросы или есть предложение?
                    </h4>
                    <p class="extra-faq__text">Отправьте свой вопрос нам.</p>
                </div>
                <div>
                <a href="/rating" class="navigation__link text-dark"><button type="button" class="btn main__button bg-light">Написать</button></a>
                </div>
        </section>
        </div>
        </div>`;
        fillAccordeon('Общие вопросы', '');
    }
    addListeners() {
        const BUTTONS = document.getElementsByClassName('faq__buttons')[0] as HTMLDivElement;
        const INPUT = document.getElementById('faqInput') as HTMLInputElement;
        BUTTONS.addEventListener('click', (event) => {
            const CURRENT_BUTTON = event.target as HTMLButtonElement;
            if (CURRENT_BUTTON.classList.contains('faq__button')) {
                event.stopImmediatePropagation();
                Array.from(BUTTONS.children).forEach((el) => {
                    el.classList.remove('active');
                });
                CURRENT_BUTTON.classList.add('active');
                fillAccordeon(CURRENT_BUTTON.innerHTML.trim(), INPUT.value);
            }
        });
        INPUT.addEventListener('input', () => {
            const CURRENT_BUTTON = document.getElementsByClassName('active')[0] as HTMLButtonElement;
            fillAccordeon(CURRENT_BUTTON.innerHTML, INPUT.value);
        });
    }
}
