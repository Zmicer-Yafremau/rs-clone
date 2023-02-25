import { Controller } from '.';
import { switchHeader } from '../view/mainView/switch-header';
export function exit(controller: Controller) {
    localStorage.clear();
    controller.route(location.origin);
    switchHeader();
}
