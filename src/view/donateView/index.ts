import { Model } from '../../model/index';
import { Controller } from '../../controller';

export class DonateView {
    constructor(private controller: Controller, private model: Model, private root: Element) {}

    render() {
        this.root.innerHTML = `<div/>Donate</div>`;
    }
}
