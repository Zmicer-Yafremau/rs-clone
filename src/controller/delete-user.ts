import { Authorization } from '../model/authorization';
export async function deleteUser() {
    const USR = new Authorization();
    const USR_OBJ = await USR.get(localStorage.token);
    console.log(USR_OBJ);
    await USR.remove(USR_OBJ[0].id);
    localStorage.token = '';
    location.replace(location.origin);
}
