export function animateNavigation(start: number, finish: number, step: number) {
    const element = document.getElementsByClassName('navigation')[0] as HTMLDivElement;
    const element_move = element.children[0] as HTMLElement;
    function makeStep() {
        element_move.style.transform = `translateY(${start}px)`;
        start += step;
        if (start !== finish) {
            requestAnimationFrame(makeStep);
        }
    }
    makeStep();
}
