import { Model } from "../model/index";
import { RouterController } from "./router.controller";

export class Controller { 

  routerController: RouterController;
  
  constructor(private model: Model) { 
    this.routerController = new RouterController(model);
  }


}