import hotkeys from 'hotkeys-js';
import { Controller } from '../controller';
import { Model } from '../model';

export class Hotkeys {
    constructor(private controller: Controller, private model: Model) {}

    async addHotKeys() {
        hotkeys('alt+s', (event) => {
            event.preventDefault();
            this.controller.route(location.origin + `/box/new`);
        });

        hotkeys('alt+r', (event) => {
            event.preventDefault();
            this.controller.route(location.origin + `/rating`);
        });

        hotkeys('alt+c', (event) => {
            event.preventDefault();
            this.controller.route(location.origin + `/faq`);
        });

        hotkeys('alt+e', (event) => {
            event.preventDefault();
            const setting = document.getElementById('setting') as HTMLDivElement;
            const path = window.location.pathname.split('/')[2];
            if (setting) {
                this.controller.route(location.origin + `/box/${path}/edit`);
            }
        });

        hotkeys('alt+t', (event) => {
            event.preventDefault();
            const path = window.location.pathname.split('/')[2];
            const pathCard = window.location.pathname.split('/')[3];
            const pathEdit = window.location.pathname.split('/')[4];
            if (pathCard === 'card' && !pathEdit) {
                this.controller.route(location.origin + `/box/${path}/card/edit`);
            }
        });

        hotkeys('ctrl+e', function (event) {
            const svgEnvelope = document.querySelector('.svg-envelope') as HTMLSpanElement;
            const svgStar = document.querySelector('.svg-star') as HTMLSpanElement;
            const textWish = document.querySelector('.txt-wish') as HTMLSpanElement;
            const svgWish = document.querySelector('.svg-wish') as HTMLSpanElement;
            const showContact = document.querySelector('.show-contact') as HTMLSpanElement;
            const showWish = document.querySelector('.show-wish') as HTMLSpanElement;
            event.preventDefault();
            if (svgEnvelope) {
                svgEnvelope.classList.add('svg-star');
                svgEnvelope.classList.remove('svg-envelope');
                textWish.innerText = 'Показать пожелания';
                svgWish.innerHTML =
                    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="background: none; width: 1.2rem; height: 1.2rem;"><path d="M12 17.235L6.179 20l1.209-6.12L3 9.392l6.179-.771L12 3l2.821 5.621L21 9.392l-4.388 4.488L17.821 20 12 17.235z" stroke="#FF6960" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
                showContact.classList.toggle('hidden');
                showWish.classList.toggle('hidden');
            } else if (svgStar) {
                svgStar.classList.add('svg-envelope');
                svgStar.classList.remove('svg-star');
                textWish.innerText = 'Показать контакты';
                svgWish.innerHTML =
                    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" style = "background: none; width: 1.2rem; height: 1.2rem;" ><path d="M7.5 9.75l2.925 1.804a3 3 0 003.15 0L16.5 9.75" stroke = "#FF6960" stroke - width="1.5" stroke - linecap="round" stroke - linejoin="round" > </path><path d="M18 5H6a3 3 0 00-3 3v8a3 3 0 003 3h12a3 3 0 003-3V8a3 3 0 00-3-3z" stroke="#FF6960" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path > </svg>';
                showContact.classList.toggle('hidden');
                showWish.classList.toggle('hidden');
            }
        });
    }
}
