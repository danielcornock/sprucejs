import { SpruceApp } from '../spruce-app';
import { ExpressApplicationFactory } from './express-application.factory';

export class SpruceFactory {
  static create(): SpruceApp {
    return new SpruceApp(ExpressApplicationFactory.create());
  }
}
