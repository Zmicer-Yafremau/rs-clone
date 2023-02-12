import { Model } from '../../model/index';
import { Controller } from '../../controller';

export class ErrorView {
    constructor(private controller: Controller, private model: Model, private root: Element) {}

    render() {
        this.root.innerHTML = `<div>This page not found</div>`;
    }
}
