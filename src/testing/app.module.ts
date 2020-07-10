import { IModule } from '../application/interfaces/module.interface';
import { PoopController, PoopRouter, TestController, TestRouter } from './test-router';

export const PoopModule: IModule = {
  imports: [],
  providers: [PoopController],
  routes: [{ url: '/poop', router: PoopRouter }]
};
export const AppModule: IModule = {
  imports: [PoopModule],
  providers: [TestController],
  routes: [
    {
      url: '/test',
      router: TestRouter,
      children: [
        {
          url: '/:id/poop',
          router: PoopRouter
        }
      ]
    }
  ]
};
