import { InjectionToken } from 'tsyringe';

import { ISpruceRouter } from '../../routing';

export interface IRouterConfig {
  url: string;
  router: InjectionToken<ISpruceRouter>;
}
