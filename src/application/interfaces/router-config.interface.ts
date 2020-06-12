import { InjectionToken } from 'tsyringe';

import { CoreRouter } from '../../routing/classes/core-router.abstract';

export interface IRouterConfig {
  url: string;
  router: InjectionToken<CoreRouter>;
}
