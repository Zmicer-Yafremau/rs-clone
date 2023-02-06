import { Controller } from '../controller';
import { Model } from '../model';

export interface IView {
    controller: Controller;
    model: Model;
    root: Element;
    render(): void;
    addListeners(): void;
}
