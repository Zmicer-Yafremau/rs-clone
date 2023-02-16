import { cardsImg } from '../../db/cardsImg';
export function addUsrPics() {
    const BOX_PICTURES = document.getElementsByClassName('box__pictures')[0] as HTMLVideoElement;
    Object.values(cardsImg).forEach((el) => {
        const DIV = document.createElement('div');
        DIV.classList.add('box__svg');
        DIV.innerHTML = el;
        BOX_PICTURES.append(DIV);
    });
}
