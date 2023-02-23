import { Authorization } from '../model/authorization';
import { Box } from '../model/box';
import { Card } from '../model/card';
import { UserBoxes } from '../model/userBoxes';

export async function deleteUser() {
    const DELETE_ERR = document.getElementsByClassName('delete__error')[0] as HTMLDivElement;
    DELETE_ERR.classList.add('visually-hidden');
    const ADMINS = document.getElementsByClassName('account__admins')[0] as HTMLSpanElement;
    ADMINS.innerHTML = '';
    const USR = new Authorization();
    const BOX = new Box();
    const CARD = new Card();
    const U_BOX = new UserBoxes();
    const U_BOX_OBJ = await U_BOX.getByUserId(localStorage.id);
    const ADMIN_BOX_ARR = await BOX.getByAdminId(localStorage.id);
    const DRAW_CHECK: string[] = [];
    console.log('ADMIN_BOX_ARR', ADMIN_BOX_ARR);
    console.log('U_BOX_OBJ', U_BOX_OBJ);
    console.log('----------------ENTER-------------------------');
    if (U_BOX_OBJ.length) {
        console.log('----------------FIRST-------------------------');
        if (U_BOX_OBJ[0].user_boxes.length) {
            console.log('----------------F_1-------------------------');
            await U_BOX_OBJ[0].user_boxes.forEach(async (box_id) => {
                const NOT_ADMIN_BOX = await BOX.getByBoxId(box_id);
                if (NOT_ADMIN_BOX.is_draw) DRAW_CHECK.push(NOT_ADMIN_BOX.admin_name);
            });
            if (DRAW_CHECK.length) {
                console.log('----------------F_2-------------------------');
                DELETE_ERR.classList.remove('visually-hidden');
                ADMINS.innerHTML = `${JSON.stringify(DRAW_CHECK)}`;
            } else {
                console.log('----------------F_3-------------------------');
                await U_BOX_OBJ[0].user_boxes.forEach(async (box_id) => {
                    const NOT_ADMIN_BOX = await BOX.getByBoxId(box_id);
                    console.log(NOT_ADMIN_BOX);
                    if (NOT_ADMIN_BOX.is_draw === false && NOT_ADMIN_BOX.admin_id !== +localStorage.id) {
                        console.log('Hello!');
                        const CARDS = await CARD.getCardsOfBox(box_id);
                        await CARDS.forEach(async (box_card) => {
                            if (box_card.user_id === localStorage.id) {
                                const box_obj_not_admin = await BOX.getByBoxId(box_id);
                                const updated_cards_arr = box_obj_not_admin.cards_id.filter((el) => {
                                    return el !== box_card.card_id;
                                });
                                await BOX.update(box_id, { cardsId: updated_cards_arr });
                                CARD.delete(box_card.card_id);
                            }
                        });
                    }
                });
            }
        }
    }
    await (async () => {
        console.log('----------------SECOND-------------------------');
        if (ADMIN_BOX_ARR.length) {
            console.log('----------------S_1-------------------------');
            console.log('AA', ADMIN_BOX_ARR);
            await ADMIN_BOX_ARR.forEach(async (box_obj) => {
                const CARDS = await CARD.getCardsOfBox(box_obj.box_id);
                console.log('CS', CARDS);
                await CARDS.forEach(async (box_card) => {
                    console.log('id', box_card.user_id);
                    const U_BOX_OBJ = await U_BOX.getByUserId(box_card.user_id);
                    if (U_BOX_OBJ.length) {
                        console.log('C_OBJ', U_BOX_OBJ);
                        const U_BOX_ARR = U_BOX_OBJ[0].user_boxes;
                        const ARR_UPDATED = U_BOX_ARR.filter((el) => {
                            return el !== box_card.box_id;
                        });
                        await U_BOX.update(U_BOX_OBJ[0].id, ARR_UPDATED, U_BOX_OBJ[0].account_id);
                    }
                });
            });
        }
    })();
    await (async () => {
        console.log('----------------THIRD-------------------------');
        if (ADMIN_BOX_ARR.length) {
            console.log('----------------T_1-------------------------');
            await ADMIN_BOX_ARR.forEach(async (admin_box) => {
                const CARDS = await CARD.getCardsOfBox(admin_box.box_id);
                console.log('CS_3', CARDS);
                if (CARDS.length) {
                    await CARDS.forEach(async (admin_box_card) => {
                        await CARD.delete(admin_box_card.card_id);
                    });
                }
                const BOX_DELETE = await BOX.delete(admin_box.box_id);
                console.log('BOX_DEL', BOX_DELETE);
            });
        }
    })();
    await (async () => {
        if (U_BOX_OBJ.length) {
            const U_B_DEL = await U_BOX.delete(U_BOX_OBJ[0].id);
        } else console.log('U_BOX_OBJ', U_BOX_OBJ);
        const USR_DEL = await USR.remove(localStorage.id);
        if (USR_DEL.error) {
            console.log(USR_DEL);
        } else {
            localStorage.token = '';
            localStorage.id = '';
            localStorage.boxId = '';
            localStorage.name = '';
            localStorage.inviteKey = '';
            location.replace(location.origin);
        }
    })();
}
