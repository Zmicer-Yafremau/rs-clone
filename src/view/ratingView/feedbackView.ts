import { create } from '../../utils/utils';

export class FeedbackView {
    render(root: HTMLElement) {
        root.innerHTML = '';
        const feedbackList = create<HTMLElement>('block-feedbacks', 'div');
        this.fill(feedbackList);
        root.append(feedbackList);
    }

    fill(root: HTMLElement) {
        root.innerHTML = `
    <div class="user_message">
              <div class="author_rating">
              <div class="author">Админ, Владелец магазина</div>
              <div class="feedback">
              <i class="feedback-star fa-solid fa-star"></i>
              <i class="feedback-star fa-solid fa-star"></i>
              <i class="feedback-star fa-solid fa-star"></i>
              <i class="feedback-star fa-solid fa-star"></i>
              <i class="feedback-star fa-regular fa-star"></i>
              </div>
              </div>
              <div class="feedback-text">Сотрудничаем с компанией уже 6 лет и впечатления исключительно положительные. <br>
              Отличное качество продукции: можно без колебаний заказывать любую позицию и быть уверенным, что использовано лучшее сырье.
              </div>
    </div>`;
    }
}
