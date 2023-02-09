import { Authorization } from '../model/authorization';
import { USR_STATE } from '../db/usr-state';
export async function deleteUser() {
    const USR = new Authorization();
    await USR.remove(localStorage.id);
    localStorage.token = '';
    location.replace(location.origin);
}
