export function exit() {
    localStorage.clear();
    location.replace(location.origin);
}
