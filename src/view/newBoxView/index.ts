import { Model } from '../../model/index';
import { Controller } from '../../controller';

export class NewBoxView {
    constructor(private controller: Controller, private model: Model, private root: Element) {}

    render() {
        this.root.innerHTML = `<div class="box">
        <div class="box__wrapper">
        <div class="screenshot screenshot--cost">
        <div class="screenshot__container">
            <div class="screenshot__header">
                <h4 class="center">Стоимость подарков</h4>
            </div>
            <div class="screenshot__body">
                <div class="screenshot__limit between">
                    <span>Ограничение стоимости подарков</span>
                    <div class="form-check form-switch">
                        <input class="form-check-input screenshot__toggle-input" type="checkbox"
                            role="switch" id="flexSwitchCheckCheckedDisabled" checked disabled>
                        <label class="form-check-label screenshot__toggle-label"
                            for="flexSwitchCheckCheckedDisabled"></label>
                    </div>
                </div>
                <div class="screenshot__inputs row">
                    <div class="col">
                        <label for="exampleFormControlInput1"
                            class="form-label fw-lighter">Cумма</label>
                        <input type="text" class="form-control bg-light"
                            id="exampleFormControlInput1" placeholder="1500" disabled>
                    </div>
                    <div class="col">
                        <label for="exampleFormControlInput1"
                            class="form-label fw-lighter">Валюта</label>
                        <select class="form-select bg-light"
                            aria-label="Disabled select example" disabled>
                        </select>
                    </div>
                </div>
            </div>

            <div class="screenshot__footer">
                <div class="row screenshot__footer-row between">
                    <div class="col center">
                        <button type="button" class="screenshot__btn"><svg
                                xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="white" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                            </svg></button>
                    </div>
                    <div class="col center text-center">Шаг 2 из 4</div>
                    <div class="col center">
                        <button type="button" class="screenshot__btn active"><svg
                                xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="white" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg></button>
                    </div>
                </div>

            </div>
        </div>
    </div>
        </div>
        </div>`;
    }
    addListeners() {
        console.log('box');
    }
}