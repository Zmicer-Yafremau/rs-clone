import { Model } from '../../model/index';
import { Controller } from '../../controller';
import { BoxView } from '../boxView';

export class CardView {
    constructor(private controller: Controller, private model: Model, private root: Element) {}

    async render(path3: string) {
        const boxCards = document.querySelector('.box__cards') as HTMLDivElement;
        boxCards.innerHTML = '';
        boxCards.innerHTML = `
<div class="my-card__wrapper">
<div class="my-card">
<span class="my-card__bg">
<svg width="802" height="769" viewBox="0 0 802 769" fill="none">
<g clip-path="url(#prefix__clip0_3368_21643)">
<g opacity="0.28" filter="url(#prefix__filter0_f_3368_21643)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M841.914 379.602c34.211 21.065 52.431 61.459 64.265 101.914 10.087 34.487 4.889 71.384-2.946 107.719-7.105 32.947-17.339 65.802-39.828 90.635-21.943 24.232-52.302 34.53-82.174 44.088-31.452 10.064-63.699 20.923-94.452 12.43-33.317-9.202-61.017-31.885-81.106-60.916-21.943-31.712-40.946-68.943-36.82-109.506 4.163-40.915 34.269-72.881 58.756-106.128 26.559-36.061 49.076-79.817 89.285-94.871 41.65-15.594 88.583-7.8 125.02 14.635z" fill="url(#prefix__paint0_linear_3368_21643)"></path></g>
<g opacity="0.28" filter="url(#prefix__filter1_f_3368_21643)"><path fill-rule="evenodd" clip-rule="evenodd" d="M-7.077 490.971c-29.9 17.126-66.692 26.358-83.607 56.387-17.539 31.137-14.974 69.548-6.96 104.396 7.912 34.41 24.412 66.983 51.56 89.557 26.493 22.03 62.403 22.698 95.385 32.633 42.975 12.944 84.95 50.469 126.793 34.289 41.778-16.154 54.056-68.871 70.464-110.564 15.698-39.891 39.619-84.633 21.681-123.592-17.778-38.609-72.366-38.648-107.437-62.652-28.27-19.349-43.34-59.672-77.333-63.814-34.062-4.15-60.78 26.311-90.546 43.36z" fill="url(#prefix__paint1_linear_3368_21643)"></path></g>
<g opacity="0.28" filter="url(#prefix__filter2_f_3368_21643)"><path fill-rule="evenodd" clip-rule="evenodd" d="M-43.096 59.381c-21.553 12.345-48.072 19-60.265 40.645-12.642 22.444-10.793 50.131-5.017 75.25 5.703 24.803 17.597 48.282 37.165 64.554 19.097 15.88 44.981 16.362 68.756 23.523 30.977 9.33 61.233 36.379 91.394 24.716 30.114-11.645 38.965-49.643 50.791-79.697 11.316-28.754 28.559-61.004 15.629-89.086-12.815-27.83-52.163-27.859-77.442-45.161C57.537 60.178 46.674 31.112 22.17 28.127-2.38 25.136-21.639 47.092-43.096 59.38z" fill="url(#prefix__paint2_linear_3368_21643)"></path></g>
<g opacity="0.28" filter="url(#prefix__filter3_f_3368_21643)"><path fill-rule="evenodd" clip-rule="evenodd" d="M335.817 548.347c19.218 20.338 24.194 50.799 24.863 80.148.569 25.019-9.579 48.905-21.4 71.937-10.719 20.885-23.526 41.143-43.132 53.796-19.131 12.346-41.412 13.802-63.231 14.847-22.973 1.101-46.625 2.593-65.784-8.664-20.755-12.197-35.301-32.45-43.583-55.602-9.046-25.29-15.119-53.762-5.031-80.308 10.176-26.775 36.192-42.854 58.659-60.807 24.369-19.472 47.405-44.85 77.169-47.729 30.831-2.983 61.001 10.72 81.47 32.382z" fill="url(#prefix__paint3_linear_3368_21643)"></path></g><circle opacity="0.28" cx="685.5" cy="73.5" r="185.5" stroke="#FFEFF3" stroke-width="12"></circle><circle opacity="0.28" cx="275.5" cy="673.5" r="185.5" stroke="#FFEDEC" stroke-width="12"></circle><circle opacity="0.28" cx="516" cy="139" r="64" stroke="#E7F5FF" stroke-width="12"></circle><circle opacity="0.28" cx="440" cy="561" r="64" stroke="#F1ECFE" stroke-width="12"></circle><circle opacity="0.28" cx="-10" cy="251" r="64" stroke="#E7F5FF" stroke-width="12"></circle></g>
<defs><linearGradient id="prefix__paint0_linear_3368_21643" x1="869.978" y1="204.806" x2="670.378" y2="730.602" gradientUnits="userSpaceOnUse"><stop stop-color="#F6FFE6"></stop><stop offset="1" stop-color="#FFEFEF"></stop></linearGradient><linearGradient id="prefix__paint1_linear_3368_21643" x1="-46.5" y1="419" x2="199.5" y2="533.5" gradientUnits="userSpaceOnUse"><stop stop-color="#E1F3FF"></stop><stop offset="1" stop-color="#FBEFFF" stop-opacity="0.81"></stop></linearGradient><linearGradient id="prefix__paint2_linear_3368_21643" x1="-71.512" y1="7.503" x2="105.808" y2="90.037" gradientUnits="userSpaceOnUse"><stop stop-color="#E1F3FF"></stop><stop offset="1" stop-color="#FBEFFF" stop-opacity="0.81"></stop></linearGradient><linearGradient id="prefix__paint3_linear_3368_21643" x1="386.206" y1="435.811" x2="157.143" y2="753.562" gradientUnits="userSpaceOnUse"><stop stop-color="#F6FFE6"></stop><stop offset="1" stop-color="#FFEFEF"></stop></linearGradient><filter id="prefix__filter0_f_3368_21643" x="468.286" y="256.811" width="543.471" height="582.633" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_3368_21643"></feGaussianBlur></filter><filter id="prefix__filter1_f_3368_21643" x="-203.818" y="347.227" width="578.445" height="564.988" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_3368_21643"></feGaussianBlur></filter><filter id="prefix__filter2_f_3368_21643" x="-262.828" y="-122.15" width="572.789" height="563.088" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur stdDeviation="75" result="effect1_foregroundBlur_3368_21643"></feGaussianBlur></filter><filter id="prefix__filter3_f_3368_21643" x="13.291" y="415.559" width="447.411" height="454.264" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_3368_21643"></feGaussianBlur></filter><clipPath id="prefix__clip0_3368_21643"><path fill="#fff" d="M0 0h735v692H0z"></path></clipPath></defs></svg>
</span>
<div class="my-card__top">
<div class="my-card__picture-wrapper">
<span class="svg-picture">
{Picture.User}
</span>
</div>
<span class="txt-buttons txt">{Name.User}</span>
<div class="my-card__edit">
<span class="svg-edit">
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="width: 2rem; height: 2rem; background: none;">
<path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" fill="#50426C"></path>
<path d="M14.77 11.06l-1.83-1.83M9.126 16.5H7.5v-1.626c0-.132.053-.26.146-.353l6.667-6.668a.5.5 0 01.707 0l1.126 1.126a.5.5 0 010 .707l-6.667 6.668a.499.499 0 01-.353.146v0z" stroke="#FFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</span>
</div>
</div>
<div class="my-card__main">
<div class="my-card__wish-wrapper">
<div class="my-card__wish">
<span>
<span></span>
<p>
<a class="" href="/box/boxName=id/card=id/edit">
<div class="btn-secondary">
<span class="txt-buttons txt">Добавить пожелания</span>
</div>
</a>
</p>
</span>
</div>
</div>
</div>
<div class="my-card__info__bottom-wrapper">
<div class="my-card__info__action">
<div class="my-card__info__action__icon-wrapper">
<div class="btn-main how__numbers center">
<div class="btn-icon__icon-wrapper">
<span class="svg-envelope">
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="background: none; width: 1.2rem; height: 1.2rem;"><path d="M7.5 9.75l2.925 1.804a3 3 0 003.15 0L16.5 9.75" stroke="#FF6960" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 5H6a3 3 0 00-3 3v8a3 3 0 003 3h12a3 3 0 003-3V8a3 3 0 00-3-3z" stroke="#FF6960" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
</span>
</div>
</div>
</div>
<span class="txt-secondary txt-grey">Показать контакты</span>
</div>
<div class="my-card__info__action">
<div class="my-card__info__action__icon-wrapper">
<div class="btn-main how__numbers center">
<div class="btn-icon__icon-wrapper">
<span class="svg-gift">
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="background: none; width: 1.2rem; height: 1.2rem;"><path clip-rule="evenodd" d="M20 8H4a1 1 0 00-1 1v2a1 1 0 001 1h16a1 1 0 001-1V9a1 1 0 00-1-1z" stroke="#FF6960" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 21V8M15.696 6.612C14.618 7.734 12.921 8 12.1 8M12.1 8s-.495-3.116.72-4.38M15.696 6.612a2.177 2.177 0 000-2.992 1.978 1.978 0 00-2.875 0M8.304 6.612C9.382 7.734 11.079 8 11.901 8M11.9 8s.495-3.116-.72-4.38M8.304 6.612a2.177 2.177 0 010-2.992 1.978 1.978 0 012.875 0M19 12v8a1 1 0 01-1 1H6a1 1 0 01-1-1v-8" stroke="#FF6960" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
</span>
</div>
</div>
</div>
<span class="txt-secondary txt-grey">Я получил подарок</span>
</div>
</div>
</div>
</div>
    `;
    }
}
