import { IBoxReq, IUserBoxesReq } from '../types/requestTypes';

export class UserBoxes {
    url: string;
    constructor() {
        this.url = `https://santa-secret-clone.up.railway.app/user-boxes`;
    }
    async getByUserId(id: number): Promise<IUserBoxesReq[]> {
        return (await fetch(`${this.url}/${id}`)).json();
    }

    async update(id: number, userBoxes: number[], accountId: number): Promise<IBoxReq> {
        return (
            await fetch(`${this.url}`, {
                method: 'PUT',
                body: JSON.stringify({ id, userBoxes, accountId }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        ).json();
    }
    async create(userBoxes: number[], accountId: number): Promise<IUserBoxesReq> {
        const response = await fetch(`${this.url}`, {
            method: 'POST',
            body: JSON.stringify({ userBoxes, accountId }),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        return result;
    }

    async delete(id: number) {
        return (
            await fetch(`${this.url}/${id}`, {
                method: 'DELETE',
            })
        ).json();
    }
}
