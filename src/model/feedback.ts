import { IFeedback } from '../types/requestTypes';

export class Feedback {
    url: string;
    constructor() {
        this.url = `https://santa-secret-clone.up.railway.app/feedback`;
    }
    async getByUser(id: number): Promise<IFeedback> {
        return (await fetch(`${this.url}/${id}`)).json();
    }
    async getAll(): Promise<IFeedback[]> {
        return (await fetch(`${this.url}`)).json();
    }
    async update(id: number, rating: number, text: string, userName: string, userId: number): Promise<IFeedback> {
        return (
            await fetch(`${this.url}`, {
                method: 'PUT',
                body: JSON.stringify({ id, rating, text, userName, userId }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        ).json();
    }
    async create(rating: number, text: string, userName: string, userId: number): Promise<IFeedback> {
        const response = await fetch(`${this.url}`, {
            method: 'POST',
            body: JSON.stringify({ rating, text, userName, userId }),
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
