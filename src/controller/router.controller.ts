import { Model } from '../model/index';
import { State } from '../types/routing';

export class RouterController {
    constructor(private model: Model) {}

    route(route: string, event: Event | false) {
        if (event) {
            event.preventDefault();
        }

        window.history.pushState({}, '', this.makeRoute(route));
        this.updateRoute(route);
    }

    updateRoute(route: string) {
        this.model.setRoute(route);
    }

    private makeRoute(route: string) {
        const { host, origin } = this.model.route;

        if (host.indexOf('github.io') > 0) {
            route = route.replace(origin.replace(State.deployPath, ''), origin + State.deployPath);
        }

        return route;
    }
}
