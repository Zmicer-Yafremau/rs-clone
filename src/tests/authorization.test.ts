import 'isomorphic-fetch';
import { Authorization } from '../model/authorization';
<<<<<<< HEAD
import { USR_STATE } from '../db/usr-state';

const USR = new Authorization();
test('Сreate user', async () => {
    const USR_1 = {
        name_1: 'Valeront',
        email_1: 'valeronchig@mail.val',
        phonenumber_1: '123123123123',
        password_1:'1234567' 
    }
    const {name_1, email_1, phonenumber_1, password_1} = USR_1
    const res_1 = await USR.create(name_1, email_1, phonenumber_1, password_1);
    const res_2 = await USR.create(name_1, email_1, phonenumber_1, password_1);
    expect(res_1).toBe(true);
    expect(res_2).toBe(false);
});
test('Get user', async () => {
    const jwtToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0N30sImlhdCI6MTY3NTY5Mzc5NCwiZXhwIjoxNjc1NzgwMTk0fQ.0l8WSB4xTS9rGxEBqkaC6hj-QBiZ5iNie1DSEknjYQ4';
    const res = await USR.get(jwtToken);
    const res_1 = await USR.get(USR_STATE.token);
    console.log('res', res_1);
    expect(res_1[0].name).toBe('Valeront');
    expect(res_1[0].phonenumber).toBe('123123123123');
    expect(res.msg).toBe('Token is not valid');
});
test('login', async () => {
    const res = await USR.login(USR_STATE.email, USR_STATE.password);
    const res_2 = await USR.login('aaaa', 'aaaaa');
    expect(res).toBe(true);
    expect(res_2).toBe(false);
});
test('Change password', async () => {
    const res = await USR.changePassword(USR_STATE.id, '32131');
    expect(res.id).toBe(USR_STATE.id);
    expect(USR_STATE.password).toBe('32131');
});
test('Change mail', async () => {
    const res = await USR.changeEmail(USR_STATE.id, 'ups@ups.ups');
    const res_fail = await USR.changeEmail(USR_STATE.id, 'a2@a.a');
    expect(res.id).toBe(USR_STATE.id);
    expect(res.email).toBe('ups@ups.ups');
    expect(USR_STATE.email).toBe('ups@ups.ups');
    expect(res_fail).toBe('User with this email already exist!');
});
test('Change name', async () => {
    const res = await USR.changeName(USR_STATE.id, 'volerik');
    expect(res.id).toBe(USR_STATE.id);
    expect(res.name).toBe('volerik');
    expect(USR_STATE.name).toBe('volerik');
});
test('Delete user', async () => {
    await USR.remove(USR_STATE.id);
    const res_1 = await USR.login(USR_STATE.email, USR_STATE.password);
    expect(res_1).toBe(false);
=======
test('real fetch call', async () => {
    const USR = new Authorization();
    const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0N30sImlhdCI6MTY3NTY5Mzc5NCwiZXhwIjoxNjc1NzgwMTk0fQ.0l8WSB4xTS9rGxEBqkaC6hj-QBiZ5iNie1DSEknjYQ4'; 
    const res = await USR.get(jwtToken);
    expect(res.msg).toBe("Token is not valid"); // Success!
>>>>>>> 3614b8b (feat: add test test)
});
