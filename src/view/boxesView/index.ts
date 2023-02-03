import { Model } from '../../model/index';
import { Controller } from '../../controller';

export class BoxesView {
    constructor(private controller: Controller, private model: Model, private root: Element) {}

    render(id: string) {
        if (id === '1') {
            this.root.innerHTML = `<div/>Boxes account</div>`;
        } else this.root.innerHTML = `<div/>Boxes</div>`;
    }
}
