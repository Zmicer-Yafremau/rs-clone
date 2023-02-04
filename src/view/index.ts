import { Controller } from '../controller/index';
import { Model } from '../model/index';
import { AccountView } from './accountView';
import { MainView } from './mainView/index';
import { Routing } from '../types/routing';
import { ErrorView } from './errorView';
import { DonateView } from './donateView';
import { create } from '../utils/utils';
import { getSelector } from '../utils/utils';


export class View {
    root: Element;
    accountView: AccountView;
    mainView: MainView;
    errorView: ErrorView;
    donateView: DonateView;

    constructor(private controller: Controller, private model: Model) {
        this.root = document.getElementById('root') as Element;
        this.addListeners();
        this.renderContent();
        const main = document.querySelector('.main__wrapper') as Element;

        this.accountView = new AccountView(this.controller, this.model, main);
        this.mainView = new MainView(this.controller, this.model, main);
        this.errorView = new ErrorView(this.controller, this.model, main);
        this.donateView = new DonateView(this.controller, this.model, main)
        this.renderRoute();
    }

    addListeners() {
        window.addEventListener('popstate', () => {
            this.controller.updateRoute(window.location.href);
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
                if (route.path.length===2||route.path.length===3&&(path2==='boxes'||path2==='')) {
                    this.accountView.render(path2); 
                }
                else{this.errorView.render();}
                break;
            
            case Routing.DONATE:
                this.donateView.render();
                break;

            default:
                this.errorView.render();
        }
    }

    addHandlers() {
        for (const link of getSelector(".nav__link") as NodeListOf<Element>) {
        link.addEventListener("click", (e: Event) => {
            this.controller.route(link.getAttribute('href')!, e);
        });
        }
    }

    renderContent() {
        const main = create<HTMLElement>('main', 'main');
        const mainWrapper = create<HTMLElement>('main__wrapper wrapper', 'div');
        main.append(mainWrapper);
        this.root.append(main);
    }
}
