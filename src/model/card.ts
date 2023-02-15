import { ICard, ICardReq } from '../types/requestTypes';

export class Card {
    url: string;
    constructor() {
        this.url = `https://santa-secret-clone.up.railway.app/card`;
    }
    async getCardsOfBox(id: number): Promise<ICardReq[]> {
        return (await fetch(`${this.url}?id=${id}`)).json();
    }
    async update(
        id: number,
        userName: string,
        wardId: number,
        cardImg: string,
        randomKey: string,
        wishes: string,
        boxId: number
    ): Promise<ICard> {
        return (
            await fetch(`${this.url}`, {
                method: 'PUT',
                body: JSON.stringify({ id, userName, wardId, cardImg, randomKey, wishes, boxId }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        ).json();
    }
    async create(
        userId: number,
        userName: string,
        wardId: number | null,
        cardImg: string,
        wishes: string,
        boxId: number
    ): Promise<ICard> {
        const response = await fetch(`${this.url}`, {
            method: 'POST',
            body: JSON.stringify({ userId, userName, wardId, cardImg, wishes, boxId }),
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
