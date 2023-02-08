export function exit() {
    localStorage.token = '';
    location.replace(location.origin);
}
