import { Model } from '../../model/index';
import { Controller } from '../../controller';
export class InviteView {
    constructor(private controller: Controller, private model: Model, private root: Element) {}

    async redirect(path: string) {
        const INVITE_KEY = `${path}`;
        localStorage.inviteKey = INVITE_KEY;
        const INVITE_BOX = this.model.boxModel;
        try {
            const res = await INVITE_BOX.getByInvitedKey(INVITE_KEY);
            localStorage.boxId = +res['box_id'];
            if (localStorage.token) {
                const ID = +localStorage.id;
                const U_BOX = this.model.userBoxesModel;
                const U_BOX_OBJ = await U_BOX.getByUserId(ID);
                if (U_BOX_OBJ[0].user_boxes.includes(+localStorage.boxId)) {
                    const U_CARD = this.model.cardModel;
                    const U_CARD_OBJ = await U_CARD.getCardsOfBox(localStorage.boxId);
                    const CHECK_CARDS = U_CARD_OBJ.some((el) => el.user_id === ID);
                    if (CHECK_CARDS) {
                        localStorage.invite = '';
                        this.controller.route(`${this.model.route.origin}/box/${localStorage.boxId}`);
                    }
                }
                this.controller.route(this.model.route.origin + '/card');
            } else {
                this.controller.route(`${this.model.route.origin}/login`);
            }
        } catch {
            localStorage.inviteKey = '';
            this.controller.route(`${this.model.route.origin}/error404`);
        }
    }
}
