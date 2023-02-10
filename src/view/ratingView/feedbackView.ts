import { create } from '../../utils/utils';
import { IFeedback } from '../../types/requestTypes';

export class FeedbackView {

    constructor(private feedbackAll: IFeedback[]) {
    }


    render(root: HTMLElement) {
        root.innerHTML = '';
        const feedbackList = create<HTMLElement>('block-feedbacks', 'div');
        this.fill(feedbackList);
        root.append(feedbackList);
    }

    fill(root: HTMLElement) {
        const data = this.feedbackAll;
        root.innerHTML = `
        ${data.reduce((sum, currentFeedback) => {
            let html = '';
            const rating = currentFeedback.rating;
            const starSolid = `<i class="feedback-star fa-solid fa-star"></i>`;
            const starRegular = `<i class="feedback-star fa-regular fa-star"></i>` 
            let stars = starSolid.repeat(rating) + starRegular.repeat(5 - rating);
        html = `<div class="user_message">
            <div class="author_rating">
            <div class="author">${currentFeedback.userName}</div>
            <div class="feedback">
            ${stars}
            </div>
            </div>
            <div class="feedback-text">${currentFeedback.userName}</div>
            </div>`;
            return sum + html;
        }, '')}`;
    }
}
