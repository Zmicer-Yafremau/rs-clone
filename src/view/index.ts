import { Controller } from '../controller/index';
import { Model } from '../model/index';
import { BoxesView } from './boxesView/index';
import { MainView } from './mainView/index';
import { create } from '../types/types';
import { Routing } from '../types/routing';
import { ErrorView } from './errorView';
import { LoginView } from './loginView';
import { RegView } from './regView';
export class View {
    root: Element;
    boxesView: BoxesView;
    mainView: MainView;
    errorView: ErrorView;
    loginView: LoginView;
    regView: RegView;

    constructor(private controller: Controller, private model: Model) {
        this.root = document.getElementById('root') as Element;
        this.addListeners();
        this.renderContent();
        const main = document.querySelector('.main') as Element;
        this.regView = new RegView(this.controller, this.model, main);
        this.loginView = new LoginView(this.controller, this.model, main);
        this.boxesView = new BoxesView(this.controller, this.model, main);
        this.mainView = new MainView(this.controller, this.model, main);
        this.errorView = new ErrorView(this.controller, this.model, main);
        this.renderRoute();
    }

    addListeners() {
        window.addEventListener('popstate', () => {
            this.controller.updateRoute(window.location.href);
        });
    }

    renderRoute() {
        const route = this.model.route;
        const [, path, id] = route.path;
        console.log(route);

        switch (path) {
            case '':
            case Routing.MAIN:
                this.mainView.render();
                break;
            case Routing.REGISTER:
                this.regView.render();
                this.regView.addListeners();
                break;
            case Routing.LOGIN:
                this.loginView.render();
                this.loginView.addListeners();
                break;
            case Routing.BOXES:
                this.boxesView.render(id);
                break;

            default:
                //console.log('404');
                this.errorView.render();
        }
    }

    renderContent() {
        const main = create<HTMLElement>('main', 'main');
        this.root.append(main);
    }
}
