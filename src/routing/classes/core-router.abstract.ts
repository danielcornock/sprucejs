import { Router } from 'express';

import { RouterService } from '../service/router.service';

export abstract class CoreRouter {
  constructor(protected readonly routerService: RouterService) {}

  public get nativeRoutes(): Router {
    return this.routerService.routes;
  }
}
