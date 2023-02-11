import { faqDB } from '../../db/faq-db';
export function fillAccordeon(category: string, search: string) {
    const ACCORDION = document.getElementById('accordionFaq') as HTMLDivElement;
    ACCORDION.innerHTML = '';
    faqDB.forEach((el) => {
        if (el.type === category) {
            if (el.body.includes(search) || el.header.includes(search)) {
                const A_ITEM = document.createElement('div');
                A_ITEM.classList.add('accordion-item');
                A_ITEM.innerHTML = `<div class="accordion-header center" id="heading${el.id}">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapse${el.id}" aria-expanded="false" aria-controls="collapse${el.id}">
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
                <h4>${el.header}</h4>
            </button>
        </div>
        <div id="collapse${el.id}" class="accordion-collapse collapse" aria-labelledby="heading${el.id}"
            data-bs-parent="#accordionFaq">
            <div class="accordion-body">
              ${el.body}
            </div>
        </div>`;
                ACCORDION.append(A_ITEM);
            }
        }
    });
}
