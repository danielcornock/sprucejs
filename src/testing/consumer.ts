import 'reflect-metadata';

import { SpruceFactory } from '../application/factories/spruce.factory';
import { SpruceApp } from '../application/spruce-app';
import { PoopRouter, TestRouter } from './test-router';

const app: SpruceApp = SpruceFactory.create();
app.setBaseUrl('/api/v1');

app.defineRoutes([
  { url: '/test', router: TestRouter },
  { url: '/poop', router: PoopRouter }
]);

app.listen(3000);
