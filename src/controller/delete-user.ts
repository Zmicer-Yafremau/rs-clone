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
    const USER_BOX = new UserBoxes();
    const USER_BOX_ARR = await USER_BOX.getByUserId(localStorage.id);
    const ADMIN_BOX_ARR = await BOX.getByAdminId(localStorage.id);
    const DRAW_CHECK: string[] = [];
    console.log('ADMIN_BOX_ARR', ADMIN_BOX_ARR);
    console.log('USER_BOX_OBJ', USER_BOX_ARR);
    /*Правараяю на наяўнасць USER_BOX*/
    if (USER_BOX_ARR.length) {
        /*Правараяю на наяўнасць ці ёсць скрыні ў аккаўнта*/
        if (USER_BOX_ARR[0].user_boxes.length) {
            /*Перабіраю ўсе скрыні аккаўнта*/
            await USER_BOX_ARR[0].user_boxes.forEach(async (box_id) => {
                const BOXES_OBJ = await BOX.getByBoxId(box_id);
                /*Правяраю ці была там праведзена жэрэб'ёўка*/
                if (BOXES_OBJ.is_draw) {
                    /* Выключаем адміна */
                    if (BOXES_OBJ.admin_id !== +localStorage.id) {
                        /*Закідваю імёны адмінаў ў массіў, каб потым дадаць у памылку, што выдаліць немагчыма*/
                        DRAW_CHECK.push(BOXES_OBJ.admin_name);
                    }
                }
            });
            /*Калі хтосьці ў массіве выводжу паведамленне аб памылцы*/
            if (DRAW_CHECK.length) {
                DELETE_ERR.classList.remove('visually-hidden');
                ADMINS.innerHTML = `${JSON.stringify(DRAW_CHECK)}`;
            } else {
                /*Калі жэрэб'ёвак не было зноў перабіраю ўсе скрыні аккаўнта*/
                await USER_BOX_ARR[0].user_boxes.forEach(async (box_id) => {
                    const BOXES_OBJ = await BOX.getByBoxId(box_id);
                    /*Выключаю адміна*/
                    if (BOXES_OBJ.admin_id !== +localStorage.id) {
                        console.log('NOT_ADMIN_BOX', BOXES_OBJ);
                        /*Перабіраю карткі скрынь дзе аккаўнт не адмін*/
                        const CARDS = await CARD.getCardsOfBox(box_id);
                        await CARDS.forEach(async (not_admin_box_card) => {
                            /*Шукаю там карткі аккаўнта*/
                            if (not_admin_box_card.user_id === +localStorage.id) {
                                /*Прыбяраю з cards_id айдзі аккаўнта*/
                                const updated_cards_arr = BOXES_OBJ.cards_id.filter((not_admin_box_card_id) => {
                                    return not_admin_box_card_id !== not_admin_box_card.card_id;
                                });
                                /*Абнаўляю скрыню*/
                                await BOX.update(box_id, { cardsId: updated_cards_arr });
                                /*Выдаляю з скрыні дзе аккаўнт не адмін картку аккаўнта*/
                                CARD.delete(not_admin_box_card.card_id);
                            }
                        });
                    }
                });
                /*Правяраю скрыні дзе аккаўнт адмін*/
                await (async () => {
                    if (ADMIN_BOX_ARR.length) {
                        /*Перабіраю усе скрыні адміна каб абнавіць юзер боксіс не адмінскіх картак ў ім*/
                        await ADMIN_BOX_ARR.forEach(async (admin_box_obj) => {
                            const ADMIN_BOX_CARDS = await CARD.getCardsOfBox(admin_box_obj.box_id);
                            /*Перабіраю акрткі скрыні адміна*/
                            await ADMIN_BOX_CARDS.forEach(async (admin_box_card) => {
                                /* Выключаем картку  адміна */
                                if (admin_box_card.user_id !== +localStorage.id) {
                                    const NOT_ADMIN_USER_BOX_ARR = await USER_BOX.getByUserId(admin_box_card.user_id);
                                    /*Правараяю на наяўнасць USER_BOX*/
                                    if (NOT_ADMIN_USER_BOX_ARR.length) {
                                        const ARR_OF_NOT_ADMIN_BOXES = NOT_ADMIN_USER_BOX_ARR[0].user_boxes;
                                        /*Прыбіраю скрыню адміна з USER_BOX не адмінскіх аккаўнтаў */
                                        const ARR_WITHOUT_ADMIN = ARR_OF_NOT_ADMIN_BOXES.filter((box) => {
                                            return box !== admin_box_card.box_id;
                                        });
                                        /*Абнаўляю USER_BOX не адмінскіх аккаўнтаў*/
                                        await USER_BOX.update(
                                            NOT_ADMIN_USER_BOX_ARR[0].id,
                                            ARR_WITHOUT_ADMIN,
                                            NOT_ADMIN_USER_BOX_ARR[0].account_id
                                        );
                                    } else {
                                        alert('У скрыні адміна ёсць юзеры бяз user-boxes');
                                    }
                                }
                            });
                        });
                        /*Перабіраю усе скрыні адміна каб выдаліць іх і карткі ў ніх*/
                        await ADMIN_BOX_ARR.forEach(async (admin_box_obj) => {
                            /*Усе карткі скрыні*/
                            const ADMIN_BOX_CARDS = await CARD.getCardsOfBox(admin_box_obj.box_id);
                            /*Правяраю на наяўнасць*/
                            if (ADMIN_BOX_CARDS.length) {
                                /*Перабіраю карткі*/
                                await ADMIN_BOX_CARDS.forEach(async (admin_box_card) => {
                                    /*Выдаляю карткі не адміна*/
                                    if (admin_box_card.user_id !== +localStorage.id) {
                                        await CARD.delete(admin_box_card.card_id);
                                    }
                                });
                                /*Перабіраю карткі*/
                                await ADMIN_BOX_CARDS.forEach(async (admin_box_card) => {
                                    /*Выдаляю картку адміна*/
                                    if (admin_box_card.user_id === +localStorage.id) {
                                        await CARD.delete(admin_box_card.card_id);
                                    }
                                });
                            }
                            /*Выдаляю скрыню*/
                            const BOX_DELETE = await BOX.delete(admin_box_obj.box_id);
                        });
                    }
                })();
            }
        }
        /*Выдаляю астатняе*/
        await (async () => {
            /*Выдаляю юзер бокс аккаўнта*/
            if (USER_BOX_ARR.length) {
                const U_B_DEL = await USER_BOX.delete(USER_BOX_ARR[0].id);
            } else alert(`Гэты аккаўнт ня мае user-box аб'екта, хаця на ўвахозе меў`);
            /*Выдаляю аккаўнт*/
            const USR_DEL = await USR.remove(localStorage.id);
            if (USR_DEL.error) {
                alert(`${JSON.stringify(USR_DEL)}`);
            } else {
                /*Калі выдаліўся чышчу і раблю рэдырэкт*/
                localStorage.token = '';
                localStorage.id = '';
                localStorage.boxId = '';
                localStorage.name = '';
                localStorage.inviteKey = '';
                location.replace(location.origin);
            }
        })();
    } else {
        alert(`Ня мае user-box аб'екта`);
        const USR_DEL = await USR.remove(localStorage.id);
        alert(`${JSON.stringify(USR_DEL)}`);
    }
}
