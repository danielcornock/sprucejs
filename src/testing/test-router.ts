import { Router } from 'express';
import { autoInjectable } from 'tsyringe';

import { CoreRouter } from '../routing/classes/core-router.abstract';
import { ISpruceRouter } from '../routing/interfaces/spruce-router.interface';
import { RouterService } from '../routing/service/router.service';

@autoInjectable()
export class TestController {
  constructor() {}

  public async get(...args: any) {
    return {
      data: 'hello!'
    };
  }
}

@autoInjectable()
export class TestRouter extends CoreRouter implements ISpruceRouter {
  private readonly _testController: TestController;

  constructor(router: RouterService, testController: TestController) {
    super(router);
    this._testController = testController;
  }

  public generateRoutes(): Router {
    this.routerService.get('/test', this._testController.get.bind(this));

    return this.nativeRoutes;
  }
}

@autoInjectable()
export class PoopController {
  constructor() {}

  public get(...args: any) {
    args[1].send('hey poop!');
  }
}

@autoInjectable()
export class PoopRouter extends CoreRouter implements ISpruceRouter {
  private readonly _poopController: PoopController;

  constructor(router: RouterService, poopController: PoopController) {
    super(router);
    this._poopController = poopController;
  }

  public generateRoutes(): Router {
    this.routerService.router.get('/poop', this._poopController.get.bind(this));

    return this.nativeRoutes;
  }
}
