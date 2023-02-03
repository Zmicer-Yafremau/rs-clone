export function create<T extends HTMLElement>(classNM = '', type = 'div'): T {
    const item = document.createElement(type);
    item.className = classNM;
    return item as T;
}
