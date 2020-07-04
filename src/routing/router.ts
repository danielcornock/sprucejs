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
      Logger.info(`\nConfiguring routes for ${route.url}:`);
      this.routerService.use(
        route.url,
        container.resolve(route.router).generateRoutes()
      );

      this._handleChildren(route);
    });

    return this.nativeRoutes;
  }

  private _handleChildren(route: IRouterConfig): void {
    if (!route.children) {
      return;
    } else {
      route.children.forEach((child: IRouterConfig) => {
        const concatenatedUrl: string = route.url + child.url;
        Logger.info(`\nConfiguring routes for ${concatenatedUrl}`);
        this.routerService.use(
          concatenatedUrl,
          container.resolve(child.router).generateRoutes()
        );
      });
    }
  }
}
