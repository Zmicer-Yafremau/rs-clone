import { Authorization } from '../model/authorization';
export function checkValidation(form: HTMLFormElement) {
    form.addEventListener(
        'submit',
        async (event) => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                event.stopPropagation();
                const USR = new Authorization();
                const FORM_TYPE = form.classList[1].split('_')[0];
                const INPUTS = (document.getElementsByClassName(
                    `${FORM_TYPE}__input`
                ) as unknown) as NodeListOf<HTMLInputElement>;
                const NAME = INPUTS[0].value;
                const PHONE = INPUTS[1].value;
                const MAIL = INPUTS[2].value;
                const PASS = INPUTS[3].value;
                await USR.create(NAME, PHONE, MAIL, PASS);
            }
            form.classList.add('was-validated');
        },
        false
    );
}
