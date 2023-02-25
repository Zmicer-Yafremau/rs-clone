import { Model } from '../../model/index';
import { Controller } from '../../controller';
import { Box } from '../../model/box';
import { UserBoxes } from '../../model/userBoxes';
import { Card } from '../../model/card';
import { renderCardReg } from '../newBoxView/renderCardReg';
export class InviteView {
    constructor(private controller: Controller, private model: Model, private root: Element) {}

    async redirect(path: string) {
        const INVITE_KEY = `${path}`;
        localStorage.inviteKey = INVITE_KEY;
        const INVITE_BOX = new Box();
        try {
            const res = await INVITE_BOX.getByInvitedKey(INVITE_KEY);
            localStorage.boxId = +res['box_id'];
            if (localStorage.token) {
                const ID = +localStorage.id;
                const U_BOX = new UserBoxes();
                const U_BOX_OBJ = await U_BOX.getByUserId(ID);
                if (U_BOX_OBJ[0].user_boxes.includes(+localStorage.boxId)) {
                    const U_CARD = new Card();
                    const U_CARD_OBJ = await U_CARD.getCardsOfBox(localStorage.boxId);
                    const CHECK_CARDS = U_CARD_OBJ.some((el) => el.user_id === ID);
                    console.log(U_CARD_OBJ);
                    if (CHECK_CARDS) {
                        localStorage.invite = '';
                        location.replace(`${this.model.route.origin}/box/${localStorage.boxId}`);
                    }
                }
                renderCardReg();
            } else {
                location.replace(`${this.model.route.origin}/login`);
            }
        } catch {
            localStorage.inviteKey = '';
            location.replace(`${this.model.route.origin}/error404`);
        }
    }
}
