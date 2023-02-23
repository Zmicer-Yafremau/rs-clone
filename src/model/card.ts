import { ICard, ICardReq } from '../types/requestTypes';

export class Card {
    url: string;
    constructor() {
        this.url = `https://santa-secret-clone.up.railway.app/card`;
    }
    async getCardsOfBox(id: number): Promise<ICardReq[]> {
        return (await fetch(`${this.url}?id=${id}`)).json();
    }
    async update(id: number, obj: Partial<ICard>): Promise<ICardReq> {
        const { userName, wardId, cardImg, wishes, boxId, userId, phone, wardGift, cardGift, email } = obj;
        return (
            await fetch(`${this.url}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    id,
                    userName,
                    wardId,
                    cardImg,
                    wishes,
                    boxId,
                    userId,
                    phone,
                    wardGift,
                    cardGift,
                    email,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        ).json();
    }

    async create(obj: ICard): Promise<ICardReq> {
        const { userName, wardId, cardImg, wishes, boxId, userId, phone, wardGift, cardGift, email } = obj;
        const response = await fetch(`${this.url}`, {
            method: 'POST',
            body: JSON.stringify({
                userName,
                wardId,
                cardImg,
                wishes,
                boxId,
                userId,
                phone,
                wardGift,
                cardGift,
                email,
            }),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        return result;
    }

    async delete(id: number) {
        const res = await fetch(`${this.url}/${id}`, {
            method: 'DELETE',
        });
        return res;
    }
}
