import { create } from '../../utils/utils';
import { Controller } from '../../controller';

export class FeedbackView {
    constructor(private controller: Controller) {}

    render(root: HTMLElement) {
        root.innerHTML = '';
        const feedbackList = create<HTMLElement>('block-feedbacks', 'div');
        this.fill(feedbackList);
        root.append(feedbackList);
    }

    async fill(root: HTMLElement) {
        const data = await this.controller.getAll();
        root.innerHTML = `
        ${data.reduce((sum, currentFeedback) => {
            let html = '';
            const rating = currentFeedback.rating;
            const starSolid = `<i class="feedback-star fa-solid fa-star"></i>`;
            const starRegular = `<i class="feedback-star fa-regular fa-star"></i>`;
            const stars = starSolid.repeat(rating) + starRegular.repeat(5 - rating);
            html = `<div class="user_message">
            <div class="author_rating">
            <div class="author">${currentFeedback.userName}</div>
            <div class="feedback">
            ${stars}
            </div>
            </div>
            <div class="feedback-text">${currentFeedback.text}</div>
            </div>`;
            return sum + html;
        }, '')}`;
    }
}
