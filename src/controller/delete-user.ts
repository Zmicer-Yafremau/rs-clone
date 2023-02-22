import { Authorization } from '../model/authorization';
import { Box } from '../model/box';
import { Card } from '../model/card';
import { UserBoxes } from '../model/userBoxes';
export async function deleteUser() {
    const USR = new Authorization();
    const BOX = new Box();
    const CARD = new Card();
    const U_BOX = new UserBoxes();
    const U_BOX_OBJ = await U_BOX.getByUserId(localStorage.id);
    U_BOX_OBJ[0].user_boxes.forEach(async (box_id) => {
        const NOT_ADMIN_BOX = await BOX.getByBoxId(box_id);
        if (NOT_ADMIN_BOX.is_draw) {
            console.log('cant');
            return;
        } else {
            const CARDS = await CARD.getCardsOfBox(box_id);
            CARDS.forEach((box_card) => {
                if ((box_card.user_id === localStorage.id)) {
                    CARD.delete(box_card.card_id);
                }
            });   
        }
    });
    const ADMIN_BOX_ARR = await BOX.getByAdminId(localStorage.id);
    ADMIN_BOX_ARR.forEach(async (box_obj) => {
        await BOX.delete(box_obj.box_id);
    });
    await U_BOX.delete(U_BOX_OBJ[0].id);
    await USR.remove(localStorage.id);
    localStorage.token = '';
    location.replace(location.origin);
}
