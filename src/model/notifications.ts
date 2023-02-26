export class Notifications {
    url: string;
    constructor() {
        this.url = `https://santa-secret-clone.up.railway.app/notice`;
    }
    async get(id: number) {
        const response = await fetch(`${this.url}/${id}`, {});
        return await response.json();
    }
    async newCard(id: number, card: number[]) {
        const response = await fetch(`${this.url}`, {
            method: 'PATCH',
            body: JSON.stringify({ id, card }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        return result;
    }
    async newBox(id: number, box: number[]) {
        const response = await fetch(`${this.url}`, {
            method: 'PATCH',
            body: JSON.stringify({ id, box }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        return result;
    }

    async create(box: number[], card: number[], userId: number) {
        const response = await fetch(`${this.url}/register`, {
            method: 'POST',
            body: JSON.stringify({ box, card, userId }),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        if (result === 'User already exist!') return false;
        return true;
    }

    async remove(id: number) {
        const response = await fetch(`${this.url}/${id}`, {
            method: 'DELETE',
        });
        return await response.json();
    }
}
