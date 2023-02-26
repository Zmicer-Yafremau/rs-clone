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
import { BoxView } from './boxView';
import { FaqView } from './faqView';
import { CardView } from './cardView';
import { NewBoxView } from './newBoxView';
import { InviteView } from './inviteView';
import { EditBoxView } from './editBox';
import { EditCardView } from './editCard';
import { BoxMenu } from './boxView/boxMenu';
import { Hotkeys } from '../components/hotkeys';
import { BoxTable } from './boxTable/boxTable';
import { USR_STATE } from '../db/usr-state';
import { NewCardView } from './newCardView';
import { colorShift } from './mainView/color-shift';
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
    cardView: CardView;
    newBoxView: NewBoxView;
    newCardView: NewCardView;
    inviteView: InviteView;
    editBoxView: EditBoxView;
    editCardView: EditCardView;
    boxMenu: BoxMenu;
    hotkeys: Hotkeys;
    boxTable: BoxTable;

    constructor(private controller: Controller, private model: Model) {
        this.root = document.getElementById('root') as Element;
        this.addListeners();
        this.renderContent();
        const main = document.querySelector('.main') as Element;
        this.regView = new RegView(this.controller, this.model, main);
        this.loginView = new LoginView(this.controller, this.model, main);
        this.accountView = new AccountView(this.controller, this.model, main);
        this.boxView = new BoxView(this.controller, this.model, main);
        this.newBoxView = new NewBoxView(this.controller, this.model, main);
        this.newCardView = new NewCardView(this.controller, this.model, main);
        this.inviteView = new InviteView(this.controller, this.model, main);
        this.faqView = new FaqView(this.controller, this.model, main);
        this.mainView = new MainView(this.controller, this.model, main);
        this.errorView = new ErrorView(this.controller, this.model, main);
        this.ratingView = new RatingView(this.controller, this.model, main);
        this.cardView = new CardView(this.controller, this.model, main);
        this.editBoxView = new EditBoxView(this.controller, this.model, main);
        this.editCardView = new EditCardView(this.controller, this.model, main);
        this.boxMenu = new BoxMenu(this.controller, this.model, main);
        this.hotkeys = new Hotkeys(this.controller, this.model);
        this.boxTable = new BoxTable(this.controller, this.model, main);
        this.renderRoute();
    }

    addHandlers() {
        for (const link of getSelector('.nav__link') as NodeListOf<Element>) {
            link.addEventListener('click', (e: Event) => {
                const href = this.model.route.origin + link.getAttribute('href');
                this.controller.route(href, e);
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
        const THEME_CHECKBOX = document.getElementsByClassName('form-check-input')[0] as HTMLInputElement;
        const BODY = document.body;
        THEME_CHECKBOX.addEventListener('change', () => {
            BODY.classList.toggle('darkTheme');
            if (BODY.classList.contains('darkTheme')) sessionStorage.dark = true;
            else sessionStorage.dark = '';
        });
    }

    async renderRoute() {
        const route = this.model.route;
        const [, path, path2, path3, path4, path5] = route.path;
        let isLogin = false;
        const USR = this.model.authorizationModel;
        if (localStorage.token) {
            const USR_OBJ = await USR.get(localStorage.token);
            if (!(USR_OBJ.msg === 'authorization denied' || USR_OBJ.msg === 'Token is not valid')) {
                USR_STATE.id = USR_OBJ[0].id;
                USR_STATE.name = USR_OBJ[0].name;
                USR_STATE.email = USR_OBJ[0].email;
                USR_STATE.phonenumber = USR_OBJ[0].phonenumber;
                localStorage.name = USR_OBJ[0].name;
                localStorage.id = USR_OBJ[0].id;
                switchHeader(USR_OBJ[0].name);
                isLogin = true;
            } else localStorage.clear();
        }
        switch (path) {
            case '':
            case Routing.MAIN:
                this.mainView.render();
                break;
            case Routing.ACCOUNT:
                if (isLogin) {
                    if (route.path.length === 2 || (route.path.length === 3 && (path2 === 'boxes' || path2 === ''))) {
                        await this.accountView.render(path2);
                        this.accountView.addListeners();
                    } else {
                        this.errorView.render();
                    }
                } else {
                    this.loginView.render();
                    this.loginView.addListeners();
                }
                break;
            case Routing.BOX:
                if (isLogin) {
                    if (!path2) {
                        this.mainView.render();
                    } else if (path2 && path3 && path3 === 'card' && path4 === 'edit') {
                        await this.boxMenu.render(path2);
                        await this.editCardView.render(path2, path5);
                        this.editCardView.addListeners();
                        break;
                    } else if (path2 && path3 && (path3 === 'card' || path3.includes('ward'))) {
                        await this.boxMenu.render(path2);
                        await this.cardView.render(path2, path3);
                        this.cardView.addListeners();
                        break;
                    } else if (path2 === 'new') {
                        this.newBoxView.render();
                        this.newBoxView.addListeners();
                        break;
                    } else if (path3 === 'santas') {
                        console.log(path3);
                        await this.boxMenu.render(path2);
                        await this.boxTable.render(path2);
                        break;
                    } else if (path2 && path3 === 'edit') {
                        await this.boxMenu.render(path2);
                        await this.editBoxView.render(path2);
                        this.editBoxView.addListeners();
                        break;
                    } else await this.boxMenu.render(path2);
                    await this.boxView.render(path2);
                    this.boxView.addListeners();
                    break;
                } else {
                    this.loginView.render();
                    this.loginView.addListeners();
                }
                break;
            case Routing.INVITE:
                if (path2) {
                    await this.inviteView.redirect(path2);
                }
                break;
            case Routing.RATING:
                await this.ratingView.render();
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
            case Routing.CARD:
                this.newCardView.render();
                this.newCardView.addListeners();
                break;
            default:
                this.errorView.render();
        }
        this.addHandlers();
        this.hotkeys.addHotKeys();
    }

    renderContent() {
        const main = create<HTMLElement>('main', 'main');
        this.root.append(main);
        const PRODUCED = document.getElementsByClassName('footer__header')[0] as HTMLHeadingElement;
        colorShift(PRODUCED);
        if (sessionStorage.dark) {
            const THEME_CHECKBOX = document.getElementsByClassName('form-check-input')[0] as HTMLInputElement;
            document.body.classList.add('darkTheme');
            THEME_CHECKBOX.setAttribute('checked', '');
        }
    }
}
