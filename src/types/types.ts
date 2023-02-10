import { Controller } from '../controller';
import { Model } from '../model';

export interface IView {
    controller: Controller;
    model: Model;
    root: Element;
    render(): void;
    addListeners(): void;
}

export type USR_STATE_TYPE = {
    id: number;
    name: string;
    email: string;
    phonenumber: string;
    password: string;
};
