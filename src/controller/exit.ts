import { Controller } from '.';
import { Model } from '../model';
import { switchHeader } from '../view/mainView/switch-header';
export function exit(controller: Controller, model: Model) {
    localStorage.clear();
    controller.route(model.route.origin);
    switchHeader();
}
