import 'reflect-metadata';

import { SpruceFactory } from '../application/factories/spruce.factory';
import { SpruceApp } from '../application/spruce-app';
import { AppModule } from './app.module';

const app: SpruceApp = SpruceFactory.create(AppModule);
app.setBaseUrl('/api/v1');

app.init();

app.listen(3000);
