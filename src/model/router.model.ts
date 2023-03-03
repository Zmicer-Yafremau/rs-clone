import { State } from '../types/routing';
export class RouterModel {
    setRoute(route: string) {
        State.route = route;
    }

    get route() {
        const route = new URL(State.route);
        const { host, origin } = route;
        return {
            host,
            origin,
            path: route.pathname.replace(State.deployPath, '/').split('/'),
        };
    }
}
