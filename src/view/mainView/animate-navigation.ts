export function animateNavigation(start: number, finish: number, step: number, element: HTMLElement) {
    function makeStep() {
        element.style.transform = `translateY(${start}px)`;
        start += step;
        if (start !== finish) {
            requestAnimationFrame(makeStep);
        }
    }
    makeStep();
}
