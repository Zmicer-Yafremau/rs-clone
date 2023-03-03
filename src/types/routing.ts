export enum Routing {
    MAIN = '/',
    INVITE = 'invite',
    ACCOUNT = 'account',
    LOGIN = 'login',
    REGISTER = 'register',
    RATING = 'rating',
    FAQ = 'faq',
    BOX = 'box',
    CARD = 'card',
    NEW_BOX = 'box/new',
}

interface IState {
    route: string;
    deployPath: string;
}

export const State: IState = {
    route: window.location.href,
    deployPath: '/rs-clone',
};
