export function hideSymbols(input: HTMLInputElement, icon: HTMLSpanElement) {
    icon.addEventListener('click', () => {
        const ART = input.getAttribute('type');
        if (ART === 'password') {
            input.type = 'text';
            console.log(icon);
            icon.children[0].classList.add('visually-hidden');
            icon.children[1].classList.remove('visually-hidden');
        } else {
            input.type = 'password';
            icon.children[1].classList.add('visually-hidden');
            icon.children[0].classList.remove('visually-hidden');
        }
    });
}
