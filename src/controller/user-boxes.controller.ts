import { Model } from '../model';
import { IUserBoxesReq } from '../types/requestTypes';

export class UserBoxesController {
    constructor(private model: Model) {}
    async updateUserBoxes(id: number, userBoxes: number[], accountId: number): Promise<IUserBoxesReq> {
        const UserBoxes = this.model.userBoxesModel;
        const result = await UserBoxes.update(id, userBoxes, accountId);
        return result;
    }
    async getUserBoxes(userId: number): Promise<IUserBoxesReq[]> {
        const UserBoxes = this.model.userBoxesModel;
        const result = await UserBoxes.getByUserId(userId);
        return result;
    }
}
