export class Authorization {
    url: string;
    constructor() {
        this.url = `https://santa-secret-clone.up.railway.app/account`;
    }
    async get(token: string) {
        const response = await fetch(`${this.url}`, {
            headers: {
                jwtToken: `${token}`,
            },
        });
        return await response.json();
    }
    async update(name: string, phonenumber: string, email: string, password: string, id: number) {
        const response = await fetch(`${this.url}`, {
            method: 'PUT',
            body: JSON.stringify({ id, name, email, phonenumber, password }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    }
    async create(name: string, phonenumber: string, email: string, password: string) {
        const response = await fetch(`${this.url}/register`, {
            method: 'POST',
            body: JSON.stringify({ name, email, phonenumber, password }),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        if (result === 'User already exist!') return false;
        else localStorage.token = result.jwtToken;
        return true;
    }
    async login(email: string, password: string) {
        const response = await fetch(`${this.url}/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        if (result === 'Invalid Credential') return false;
        return true;
    }
    async remove(id: number) {
        const response = await fetch(`${this.url}/${id}`, {
            method: 'DELETE',
        });
        return await response.json();
    }
}
