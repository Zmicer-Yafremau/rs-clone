export enum Routing {
    MAIN = '/',
    ACCOUNT = 'account',
    LOGIN = 'login',
    REGISTER = 'register',
    RATING = 'rating',
    FAQ = 'faq',
    BOX = 'box',
}

interface IState {
    route: string;
    deployPath: string;
}

export const State: IState = {
    route: window.location.href,
    deployPath: '/rs-clone',
};
