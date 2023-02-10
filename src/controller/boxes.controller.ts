import { Box } from '../model/box';
import { UserBoxes } from '../model/userBoxes';
import { IBoxReq } from '../types/requestTypes';

export class BoxesController {
    static async getBoxes(): Promise<IBoxReq[][] | undefined> {
        const Boxes = new UserBoxes();
        const OneBox = new Box();
        const userId = localStorage.getItem('id');
        const result = await Boxes.getByUserId(Number(userId));
        if (result.length === 1) {
            const boxes = await Promise.all(result[0].user_boxes.map(async (box) => await OneBox.getByBoxId(box)));
            return boxes;
        }
    }
}
