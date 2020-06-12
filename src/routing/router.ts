import { Router } from 'express';
import { autoInjectable, container } from 'tsyringe';

import { IRouterConfig } from '../application/interfaces/router-config.interface';
import { Logger } from '../utilities/logger/logger';
import { CoreRouter } from './classes/core-router.abstract';
import { RouterService } from './service/router.service';

@autoInjectable()
export class AppRouter extends CoreRouter {
  constructor(router: RouterService) {
    super(router);
  }

  public setRoutes(config: Array<IRouterConfig>): Router {
    config.forEach((route: IRouterConfig) => {
      this.routerService.use(
        route.url,
        container.resolve(route.router).nativeRoutes
      );

      Logger.info(`Configuring routes for ${route.url}`);
    });

    return this.nativeRoutes;
  }
}
