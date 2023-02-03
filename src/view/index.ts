import { Controller } from "../controller/index";
import { Model } from "../model/index";
import { BoxesView } from "./boxesView/index";
import { MainView } from "./mainView/index";
import { create } from "../types/types";


export class View {

  root: Element;
  boxesView: BoxesView;
  mainView: MainView;

  constructor(private controller: Controller, private model: Model) {
    this.root = document.getElementById("root") as Element;

    this.renderHeader();
    this.renderContent();
    this.renderFooter();

    const main = document.querySelector(".main__wrapper") as Element;

    this.boxesView = new BoxesView(
      this.controller,
      this.model,
      main
    );
    this.mainView = new MainView(
      this.controller,
      this.model,
      main,
    );
  }

  renderHeader() {
    const header = create<HTMLElement>("header", "header");

    header.innerHTML = `
            
    `;
    this.root.append(header);
  }

  renderContent() {
    const main = create<HTMLElement>("main", "main");
    const mainWrapper = create<HTMLElement>(
      "main__wrapper wrapper",
      "div"
    );
    main.append(mainWrapper);
    this.root.append(main);
  }

  renderFooter() {
    const footer = create<HTMLElement>("footer", "footer");

    footer.innerHTML = `
            
    `;

    this.root.append(footer);
  }


}