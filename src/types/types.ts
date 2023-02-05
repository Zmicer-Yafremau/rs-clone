import { Controller } from '../controller';
import { Model } from '../model';
export function create<T extends HTMLElement>(classNM = '', type = 'div'): T {
    const item = document.createElement(type);
    item.className = classNM;
    return item as T;
}

export interface IView {
    controller: Controller;
    model: Model;
    root: Element;
    render(): void;
    addListeners(): void;
}
