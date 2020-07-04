import { container, InjectionToken } from 'tsyringe';

import { IModule } from '../interfaces/module.interface';
import { SpruceApp } from '../spruce-app';
import { ExpressApplicationFactory } from './express-application.factory';

export class SpruceFactory {
  static create(appModuleToken: InjectionToken<IModule>): SpruceApp {
    return new SpruceApp(
      ExpressApplicationFactory.create(),
      container.resolve(appModuleToken)
    );
  }
}
