export function createNote(note: string) {
    const NOTE = document.createElement('div');
    NOTE.classList.add('note');
    NOTE.classList.add('center');
    NOTE.innerHTML = `<div class="toast-body between">
${note}
<button type="button" class="btn-close note__close mx-3"></button>
</div>`;

    const NOTIFICATIONS_CONTENT = document.getElementsByClassName(`notifications__content`)[0] as HTMLDivElement;
    if (NOTIFICATIONS_CONTENT) {
        NOTIFICATIONS_CONTENT.appendChild(NOTE);
    }
}
