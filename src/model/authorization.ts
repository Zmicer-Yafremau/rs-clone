import { USR_STATE } from '../db/usr-state';
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
    async changeName(id: number, name: string) {
        const response = await fetch(`${this.url}`, {
            method: 'PATCH',
            body: JSON.stringify({ id, name }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        localStorage.name = name;
        USR_STATE.name = result.name;
        return result;
    }
    async changeEmail(id: number, email: string) {
        const response = await fetch(`${this.url}`, {
            method: 'PATCH',
            body: JSON.stringify({ id, email }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        if (result !== 'User with this email already exist!') USR_STATE.email = result.email;
        return result;
    }
    async changePassword(id: number, password: string) {
        const response = await fetch(`${this.url}`, {
            method: 'PATCH',
            body: JSON.stringify({ id, password }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        USR_STATE.password = password;
        return result;
    }
    async create(name: string, email: string, phonenumber: string, password: string) {
        const response = await fetch(`${this.url}/register`, {
            method: 'POST',
            body: JSON.stringify({ name, email, phonenumber, password }),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        console.log('res', result);
        if (result === 'User already exist!') return false;
        else {
            USR_STATE.id = result.id;
            localStorage.id = result.id;
            USR_STATE.name = result.name;
            USR_STATE.email = result.email;
            USR_STATE.password = password;
            USR_STATE.phonenumber = result.phonenumber;
            localStorage.token = result.jwtToken;
            USR_STATE.token = result.jwtToken;
        }
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
        else {
            USR_STATE.id = result.id;
            localStorage.id = result.id;
            USR_STATE.name = result.name;
            USR_STATE.password = password;
            localStorage.name = result.name;
            USR_STATE.email = result.email;
            USR_STATE.phonenumber = result.phonenumber;
            localStorage.token = result.jwtToken;
            console.log('US', USR_STATE);
        }
        return true;
    }
    async remove(id: number) {
        const response = await fetch(`${this.url}/${id}`, {
            method: 'DELETE',
        });
        return await response.json();
    }
}
