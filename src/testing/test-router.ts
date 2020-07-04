import { Router } from 'express';
import { injectable } from 'tsyringe';

import { AuthMiddleware } from '../authentication/services/auth.middleware';
import { NotFoundException } from '../errors';
import { INext, IReq, IRes } from '../http';
import { CoreRouter } from '../routing/classes/core-router.abstract';
import { ISpruceRouter } from '../routing/interfaces/spruce-router.interface';
import { RouterService } from '../routing/service/router.service';

@injectable()
export class TestController {
  constructor() {}

  public async get(...args: any) {
    return {
      data: 'hello!'
    };
  }
}

@injectable()
export class CustomAuth {
  public async validate(req: IRes, res: IRes, next: INext): Promise<void> {
    next(new NotFoundException());
  }
}

@injectable()
export class TestRouter extends CoreRouter implements ISpruceRouter {
  private readonly _testController: TestController;

  constructor(
    router: RouterService,
    authMiddleware: AuthMiddleware,
    testController: TestController
  ) {
    super(router);
    this._testController = testController;
  }

  public generateRoutes(): Router {
    this.routerService.get('/test', this._testController.get.bind(this));

    return this.nativeRoutes;
  }
}

@injectable()
export class PoopController {
  constructor() {}

  public async get(req: IReq, res: IRes, next: INext) {
    res.send('hey poop!');
  }
}

@injectable()
export class PoopRouter extends CoreRouter implements ISpruceRouter {
  private readonly _poopController: PoopController;

  constructor(router: RouterService, poopController: PoopController) {
    super(router);
    this._poopController = poopController;
  }

  public generateRoutes(): Router {
    this.routerService.get('/poop', this._poopController.get.bind(this));

    return this.nativeRoutes;
  }
}
