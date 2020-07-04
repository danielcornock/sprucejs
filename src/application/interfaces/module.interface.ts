import { InjectionToken } from 'tsyringe';

import { IRouterConfig } from './router-config.interface';

export interface IModule {
  routes: Array<IRouterConfig>;
  providers: Array<InjectionToken<unknown>>;
}
