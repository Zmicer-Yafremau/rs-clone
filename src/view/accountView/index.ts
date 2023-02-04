import { Model } from '../../model/index';
import { Controller } from '../../controller';

export class AccountView {
    constructor(private controller: Controller, private model: Model, private root: Element) {}

    render(path2: string) {
        if (path2 === 'boxes') {
            this.root.innerHTML = `<div/>Boxes</div>`;
        } else this.root.innerHTML = `<div/>Account</div>`;
    }
}
