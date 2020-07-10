import { InjectionToken } from 'tsyringe';

import { IRouterConfig } from './router-config.interface';

export interface IModule {
  imports: Array<IModule>;
  routes: Array<IRouterConfig>;
  providers: Array<InjectionToken<unknown>>;
}
