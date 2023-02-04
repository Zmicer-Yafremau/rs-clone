import { Controller } from '../controller/index';
import { Model } from '../model/index';
import { BoxesView } from './boxesView/index';
import { MainView } from './mainView/index';
import { create } from '../types/types';
import { Routing } from '../types/routing';
import { ErrorView } from './errorView';

export class View {
    root: Element;
    boxesView: BoxesView;
    mainView: MainView;
    errorView: ErrorView;

    constructor(private controller: Controller, private model: Model) {
        this.root = document.getElementById('root') as Element;
        this.addListeners();
        this.renderContent();
        const main = document.querySelector('.main__wrapper') as Element;

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
        const mainWrapper = create<HTMLElement>('main__wrapper wrapper', 'div');
        main.append(mainWrapper);
        this.root.append(main);
    }
}
