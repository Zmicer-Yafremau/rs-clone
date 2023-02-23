import { USR_STATE } from '../db/usr-state';
import { Model } from '../model';
import { IBox, IBoxReq } from '../types/requestTypes';

export class BoxesController {
    constructor(private model: Model) {}
    async getBoxes(): Promise<IBoxReq[] | undefined> {
        const Boxes = this.model.userBoxesModel;
        const OneBox = this.model.boxModel;
        const userId = USR_STATE.id;
        const result = await Boxes.getByUserId(userId);
        if (result.length === 1) {
            const boxes = await Promise.all(result[0].user_boxes.map(async (box) => await OneBox.getByBoxId(box)));

            return boxes;
        }
    }
    async updateBox(id: number, obj: Partial<IBox>): Promise<IBoxReq> {
        const Box = this.model.boxModel;
        const result = await Box.update(id, obj);
        return result;
    }
    async getBox(id: number): Promise<IBoxReq> {
        const Box = this.model.boxModel;
        const result = await Box.getByBoxId(id);
        return result;
    }
    async deleteBox(id: number): Promise<Response> {
        const Box = this.model.boxModel;
        const result = await Box.delete(id);
        return result;
    }
}
