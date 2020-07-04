import { injectable } from 'tsyringe';

import { IModule } from '../application/interfaces/module.interface';
import { PoopController, PoopRouter, TestController, TestRouter } from './test-router';

@injectable()
export class AppModule implements IModule {
  public providers = [PoopController, TestController];
  public routes = [
    {
      url: '/test',
      router: TestRouter,
      children: [
        {
          url: '/:id/poop',
          router: PoopRouter
        }
      ]
    },
    { url: '/poop', router: PoopRouter }
  ];
}
