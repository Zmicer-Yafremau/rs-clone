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
import { switchHeader } from './mainView/switch-header';
import { Authorization } from '../model/authorization';
import { BoxView } from './boxView';
import { FaqView } from './faqView';

export class View {
    root: Element;
    accountView: AccountView;
    mainView: MainView;
    errorView: ErrorView;
    ratingView: RatingView;
    loginView: LoginView;
    regView: RegView;
    boxView: BoxView;
    faqView: FaqView;
    constructor(private controller: Controller, private model: Model) {
        this.root = document.getElementById('root') as Element;
        this.addListeners();
        this.renderContent();
        const main = document.querySelector('.main') as Element;
        this.regView = new RegView(this.controller, this.model, main);
        this.loginView = new LoginView(this.controller, this.model, main);
        this.accountView = new AccountView(this.controller, this.model, main);
        this.boxView = new BoxView(this.controller, this.model, main);
        this.faqView = new FaqView(this.controller, this.model, main);
        this.mainView = new MainView(this.controller, this.model, main);
        this.errorView = new ErrorView(this.controller, this.model, main);
        this.ratingView = new RatingView(this.controller, this.model, main);
        this.renderRoute();
        // this.addHandlers();
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
    listenRoute() {
        this.addHandlers();
    }
    addListeners() {
        window.addEventListener('popstate', () => {
            this.controller.updateRoute(window.location.href);
        });

        this.model.on('route', () => {
            this.renderRoute();
        });
    }

    async renderRoute() {
        const route = this.model.route;
        const [, path, path2, path3] = route.path;
        console.log(route);
        setTimeout(async () => {
            const USR = await new Authorization();
            console.log('123', localStorage.token);
            if (localStorage.token) {
                const USR_OBJ = await USR.get(localStorage.token);
                console.log(USR_OBJ);
                if (!(USR_OBJ.msg === 'authorization denied' || USR_OBJ.msg === 'Token is not valid'))
                    switchHeader(USR_OBJ[0].name);
            }
        }, 0);
        switch (path) {
            case '':
            case Routing.MAIN:
                this.mainView.render();
                break;
            case Routing.ACCOUNT:
                if (route.path.length === 2 || (route.path.length === 3 && (path2 === 'boxes' || path2 === ''))) {
                    await this.accountView.render(path2);
                    this.accountView.addListeners();
                } else {
                    this.errorView.render();
                }
                break;

            case Routing.BOX:
                if (!path2) {
                    this.mainView.render();
                }
                await this.boxView.render(path2);
                this.boxView.addListeners();
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
            case Routing.FAQ:
                this.faqView.render();
                this.faqView.addListeners();
                break;
            default:
                this.errorView.render();
        }
        this.addHandlers();
    }

    renderContent() {
        const main = create<HTMLElement>('main', 'main');
        this.root.append(main);
    }
}
