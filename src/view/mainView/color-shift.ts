export function colorShift(element: HTMLElement) {
    let start = 0;
    const finish = 1000;
    let step = 0;
    function makeStep() {
        step = (start / finish) * 360;
        element.style.color = `hsl(${step}, 80%, 50%)`;
        start++;
        //console.log(step);
        requestAnimationFrame(makeStep);
        if (start === finish) {
            start = 0;
        }
    }
    makeStep();
}
