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
          url: '/:testId/poop',
          router: PoopRouter,
          children: [
            {
              url: '/:poopId/test',
              router: TestRouter,
              children: [
                {
                  url: '/:anotherId/yolo',
                  router: PoopRouter
                }
              ]
            }
          ]
        }
      ]
    },
    {
      url: '/poop',
      router: PoopRouter,
      children: []
    }
  ]
};
