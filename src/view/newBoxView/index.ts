import { Model } from '../../model/index';
import { Controller } from '../../controller';

export class NewBoxView {
    constructor(private controller: Controller, private model: Model, private root: Element) {}

    render() {
        this.root.innerHTML = `<div class="box">
        <div class="box__wrapper">
        <div class="box__container container screenshot__container shadow-lg bg-body-tertiary rounded">
        <form novalidate>    
        <div class="screenshot__header">
                <h4 class="center">Создать коробку</h4>
            </div>
            <div class="screenshot__body">
                <div class="screenshot__limit">
                    <div class="col">
                    <label for="exampleFormControlInput1"
                        class="form-label fw-lighter">Название коробки:</label>
                    <input type="text" class="form-control bg-light"
                        id="exampleFormControlInput1" placeholder="" minsize="1">
                </div>
                </div>
                <div class="box__pictures">


                </div>
            </div>

            <div class="screenshot__footer center">
                        <button type="submit" class="btn main__button active">Создать</button>

            </div>
        </div>
        </form>
        </div>
        </div>`;
    }
    addListeners() {
        console.log('box');
    }
}
