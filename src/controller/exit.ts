import { Controller } from '.';
import { Model } from '../model';
import { switchHeader } from '../view/mainView/switch-header';
import { USR_STATE } from '../db/usr-state';
export function exit(controller: Controller, model: Model) {
    localStorage.clear();
    USR_STATE.id = 0;
    USR_STATE.name = '';
    USR_STATE.email = '';
    USR_STATE.phonenumber = '';
    USR_STATE.password = '';
    USR_STATE.token = '';
    controller.route(model.route.origin);
    switchHeader('', controller, model);
}
