import { Model } from '../model';
import { IBox, IBoxReq } from '../types/requestTypes';

export class BoxesController {
    constructor(private model: Model) {}
    async getBoxes(): Promise<IBoxReq[] | undefined> {
        const Boxes = this.model.userBoxesModel;
        const OneBox = this.model.boxModel;
        const userId = localStorage.getItem('id');
        const result = await Boxes.getByUserId(Number(userId));
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
}
