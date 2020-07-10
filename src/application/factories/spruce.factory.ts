import { IModule } from '../interfaces/module.interface';
import { SpruceApp } from '../spruce-app';
import { ExpressApplicationFactory } from './express-application.factory';

export class SpruceFactory {
  static create(appModule: IModule): SpruceApp {
    return new SpruceApp(ExpressApplicationFactory.create(), appModule);
  }
}
