export function create<T extends HTMLElement>(classNM = '', type = 'div'): T {
    const item = document.createElement(type);
    item.className = classNM;
    return item as T;
}

export function getSelector(selector: string) {
    const elements: NodeListOf<Element> = document.querySelectorAll(selector);
    if (elements.length === 1) return elements[0];
    if (elements.length) return elements;
    return null;
}
