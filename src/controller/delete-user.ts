import { Authorization } from '../model/authorization';
export async function deleteUser() {
    const USR = new Authorization();
    await USR.remove(localStorage.id);
    localStorage.token = '';
    location.replace(location.origin);
}
