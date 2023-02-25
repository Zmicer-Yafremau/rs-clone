import 'isomorphic-fetch';
import { Authorization } from '../model/authorization';
test('real fetch call', async () => {
    const USR = new Authorization();
    const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0N30sImlhdCI6MTY3NTY5Mzc5NCwiZXhwIjoxNjc1NzgwMTk0fQ.0l8WSB4xTS9rGxEBqkaC6hj-QBiZ5iNie1DSEknjYQ4'; 
    const res = await USR.get(jwtToken);
    expect(res.msg).toBe("Token is not valid"); // Success!
});
