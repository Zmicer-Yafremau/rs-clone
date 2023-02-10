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

export function getEnding(number: number, var1: string, var2: string, var3: string) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return var3;
    }
    n %= 10;
    if (n === 1) {
        return var1;
    }
    if (n >= 2 && n <= 4) {
        return var2;
    }
    return var3;
}
