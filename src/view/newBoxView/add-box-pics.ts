import { boxImages } from '../../db/boxesImg';
export function addBoxPics() {
    const BOX_PICTURES = document.getElementsByClassName('box__pictures')[0] as HTMLVideoElement;
    Object.values(boxImages)
        .slice(0, 6)
        .forEach((el) => {
            const DIV = document.createElement('div');
            DIV.classList.add('box__svg');
            DIV.innerHTML = el;
            BOX_PICTURES.append(DIV);
        });
}
