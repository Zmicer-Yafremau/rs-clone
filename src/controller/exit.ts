export function exit() {
    console.log('hi');
    localStorage.token = '';
    location.replace(location.origin);
}
