import { Authorization } from '../model/authorization';
import { Box } from '../model/box';
import { Card } from '../model/card';
import { UserBoxes } from '../model/userBoxes';
export async function deleteUser() {
    const PART_ERR = document.getElementsByClassName('delete__error-part')[0] as HTMLDivElement;
    PART_ERR.classList.add('visually-hidden');
    const ADMIN_ERR = document.getElementsByClassName('delete__error-admin')[0] as HTMLDivElement;
    ADMIN_ERR.classList.add('visually-hidden');
    const ADMINS = document.getElementsByClassName('account__admins')[0] as HTMLSpanElement;
    ADMINS.innerHTML = '';
    const USR = new Authorization();
    const BOX = new Box();
    const CARD = new Card();
    const USER_BOX = new UserBoxes();
    const USER_BOX_ARR = await USER_BOX.getByUserId(localStorage.id);
    const ADMIN_BOX_ARR = await BOX.getByAdminId(localStorage.id);
    let admin_boxes = false;
    const PART_CHECK: string[] = [];
    console.log('ADMIN_BOX_ARR', ADMIN_BOX_ARR);
    console.log('USER_BOX_OBJ', USER_BOX_ARR);
    /*Правараяю на наяўнасць USER_BOX*/
    if (USER_BOX_ARR.length) {
        /*Правараяю на наяўнасць ці ёсць скрыні ў аккаўнта*/
        if (USER_BOX_ARR[0].user_boxes.length) {
            /*Перабіраю ўсе скрыні аккаўнта*/
            await USER_BOX_ARR[0].user_boxes.forEach(async (box_id) => {
                const BOXES_OBJ = await BOX.getByBoxId(box_id);
                /* Выключаем адміна */
                if (BOXES_OBJ.admin_id !== +localStorage.id) {
                    /*Закідваю імёны адмінаў ў массіў, каб потым дадаць у памылку, што выдаліць немагчыма*/
                    PART_CHECK.push(BOXES_OBJ.admin_name);
                } else admin_boxes = true;
            });
            /*Калі хтосьці ў массіве выводжу паведамленне аб памылцы*/
            if (PART_CHECK.length) {
                PART_ERR.classList.remove('visually-hidden');
                ADMINS.innerHTML = PART_CHECK.toString();
            } else ADMIN_ERR.classList.remove('visually-hidden');
        } else {
            /*Выдаляю астатняе*/

            /*Выдаляю юзер бокс аккаўнта*/
            if (USER_BOX_ARR.length) {
                const U_B_DEL = await USER_BOX.delete(USER_BOX_ARR[0].id);
            } else alert(`Гэты аккаўнт ня мае user-box аб'екта, хаця на ўвахозе меў`);
            /*Выдаляю аккаўнт*/
            const USR_DEL = await USR.remove(localStorage.id);
            if (USR_DEL.error) {
                console.log(`${JSON.stringify(USR_DEL)}`);
            } else {
                /*Калі выдаліўся чышчу і раблю рэдырэкт*/
                localStorage.clear();
                location.replace(location.origin);
            }
        }
    } else {
        console.log(`Ня мае user-box аб'екта`);
        const USR_DEL = await USR.remove(localStorage.id);
        console.log(`${JSON.stringify(USR_DEL)}`);
    }
}
