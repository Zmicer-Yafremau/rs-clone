import { Controller } from '../controller/index';
import { Model } from '../model/index';
import { AccountView } from './accountView';
import { MainView } from './mainView/index';
import { Routing } from '../types/routing';
import { ErrorView } from './errorView';
import { RatingView } from './ratingView';
import { create } from '../utils/utils';
import { getSelector } from '../utils/utils';
import { LoginView } from './loginView';
import { RegView } from './regView';

export class View {
    root: Element;
    accountView: AccountView;
    mainView: MainView;
    errorView: ErrorView;
    ratingView: RatingView;
    loginView: LoginView;
    regView: RegView;

    constructor(private controller: Controller, private model: Model) {
        this.root = document.getElementById('root') as Element;
        this.addListeners();
        this.renderContent();
        const main = document.querySelector('.main') as Element;
        this.regView = new RegView(this.controller, this.model, main);
        this.loginView = new LoginView(this.controller, this.model, main);
        this.accountView = new AccountView(this.controller, this.model, main);
        this.mainView = new MainView(this.controller, this.model, main);
        this.errorView = new ErrorView(this.controller, this.model, main);
        this.ratingView = new RatingView(this.controller, this.model, main);
        this.renderRoute();
        this.addHandlers();
    }

    addHandlers() {
        for (const link of getSelector('.nav__link') as NodeListOf<Element>) {
            link.addEventListener('click', (e: Event) => {
                const href = this.model.route.origin + link.getAttribute('href');
                this.controller.route(href, e);
                console.log(href);
            });
        }
    }

    addListeners() {
        window.addEventListener('popstate', () => {
            this.controller.updateRoute(window.location.href);
        });

        this.model.on('route', () => {
            this.renderRoute();
        });
    }

    renderRoute() {
        const route = this.model.route;
        const [, path, path2, path3] = route.path;
        console.log(route);

        switch (path) {
            case '':
            case Routing.MAIN:
                this.mainView.render();
                break;
            case Routing.ACCOUNT:
                if (route.path.length === 2 || (route.path.length === 3 && (path2 === 'boxes' || path2 === ''))) {
                    this.accountView.render(path2);
                } else {
                    this.errorView.render();
                }
                break;
            case Routing.RATING:
                this.ratingView.render();
                break;
            case Routing.REGISTER:
                this.regView.render();
                this.regView.addListeners();
                break;
            case Routing.LOGIN:
                this.loginView.render();
                this.loginView.addListeners();
                break;
            default:
                this.errorView.render();
        }
    }

    renderContent() {
        const main = create<HTMLElement>('main', 'main');
        this.root.append(main);
    }
}
