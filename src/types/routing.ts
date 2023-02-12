export enum Routing {
    MAIN = '/',
    ACCOUNT = 'account',
    LOGIN = 'login',
    REGISTER = 'register',
    RATING = 'rating',
    FAQ = 'faq',
    RANDOMIZER = 'randomizer',
    RESEND = 'resend',
    FEEDBACK = 'feedback',
    //BOXES = 'account/boxes',+
    //NEW_BOX = 'box/new',
    //BOX = 'box/name',
    //CARD = 'box/name/card',
    //WARD = 'box/name/ward',
    //DRAW = 'box/name/draw',
    //SANTAS = 'box/name/santas',
    //DELETE = 'box/name/delete',
}

interface IState {
    route: string;
    deployPath: string;
}

export const State: IState = {
    route: window.location.href,
    deployPath: '/rs-clone',
};
