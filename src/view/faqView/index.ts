import { Model } from '../../model/index';
import { Controller } from '../../controller';

export class FaqView {
    constructor(private controller: Controller, private model: Model, private root: Element) {}

    render() {
        this.root.innerHTML = `<div class="faq">
        <div class="faq__wrapper">
        <section class="quastions container-fluid">
                <h3>Вопросы и ответы про сервис</h3>
                <div class="faq__buttons mt-5">
                <button type="button" class="btn main__button faq__button bg-light active">Общие вопросы</button>
                <button type="button" class="btn main__button faq__button bg-light text-secondary">Для организаторов</button>
                <button type="button" class="btn main__button faq__button bg-light text-secondary">О сервисе</button>
                </div>
                <label for="faqInput" class="form-label text-secondary mt-3">Поиск по вопросам</label>
                <input type="text" class="form-control" id="faqInput" placeholder="">
                <div class="accordion mt-3" id="accordionFaq">
                    <div class="accordion-item">
                        <div class="accordion-header center" id="headingOne">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                <span class="questions__icon"><svg class="questions__icon-img" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none"
                                        style="background: none; width: 1.5rem; height: 1.5rem">
                                        <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" fill="#F1ECFE"></path>
                                        <path
                                            d="M9.686 9.689A2.18 2.18 0 0111.9 8.003a2.136 2.136 0 012.25 2c0 1.504-2.15 2-2.15 3"
                                            stroke="#67568C" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"></path>
                                        <path d="M13 15.878a1 1 0 10-2 0 1 1 0 002 0z" fill="#67568C"></path>
                                    </svg></span>
                                <h4>Что такое «Тайный Санта?»</h4>
                            </button>
                        </div>
                        <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
                            data-bs-parent="#accordionFaq">
                            <div class="accordion-body">
                                «Тайный Сантa» — популярная церемония анонимного обмена подарками. Это новогодняя
                                игра с простыми правилами: каждый участник является Тайным Сантой для одного из
                                остальных участников и втайне готовит для него подарок. В результате всем достаётся
                                и радость подготовки сюрприза, и подарок. Данный сайт — сервис, который помогает
                                огранизовать эту игру онлайн.
                            </div>
                        </div>
                    </div>
                </div>
         </section>
        <section class="extra-faq container-fluid between">
                <div>
                    <h4>Остались вопросы или есть предложение?
                    </h4>
                    <p class="extra-faq__text">Отправьте свой вопрос нам на почту, и мы постараемся ответить как можно скорее.</p>
                </div>
                <div>
                <a href="/feedback" class="navigation__link text-dark"><button type="button" class="btn main__button bg-light">Написать</button></a>
                </div>
        </section>
        </div>
        </div>`;
    }
}
