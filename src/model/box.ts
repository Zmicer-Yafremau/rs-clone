import { IBoxReq } from '../types/requestTypes';

export class Box {
    url: string;
    constructor() {
        this.url = `https://santa-secret-clone.up.railway.app/box`;
    }
    async getByInvitedKey(key: string): Promise<IBoxReq> {
        return (await fetch(`${this.url}/${key}`)).json();
    }
    async getByBoxId(id: number): Promise<IBoxReq> {
        return (await fetch(`${this.url}?id=${id}`)).json();
    }
    async getByAdminId(id: number): Promise<IBoxReq[]> {
        return (await fetch(`${this.url}?admin=${id}`)).json();
    }
    async update(
        id: number,
        boxName: string,
        boxImg: string,
        year: string,
        invitedKey: string,
        cardsId: number[],
        adminId: number,
        isDraw: true
    ): Promise<IBoxReq> {
        return (
            await fetch(`${this.url}`, {
                method: 'PUT',
                body: JSON.stringify({ id, boxName, boxImg, year, invitedKey, cardsId, adminId, isDraw }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        ).json();
    }
    async create(
        boxName: string,
        boxImg: string,
        year: string,
        invitedKey: string,
        cardsId: number[],
        adminId: number,
        isDraw: true
    ): Promise<IBoxReq> {
        const response = await fetch(`${this.url}`, {
            method: 'POST',
            body: JSON.stringify({ boxName, boxImg, year, invitedKey, cardsId, adminId, isDraw }),
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
