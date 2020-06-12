import 'reflect-metadata';

import cors, { CorsOptions } from 'cors';
import express from 'express';
import { container } from 'tsyringe';

import { ErrorController } from '../errors/error.controller';
import { AppRouter } from '../routing/router';
import { Logger } from '../utilities/logger/logger';
import { IRouterConfig } from './interfaces/router-config.interface';

export class SpruceApp {
  public expressApp: express.Application;
  private _baseUrl: string | undefined;

  constructor(expressApp: express.Application) {
    this.expressApp = expressApp;
    this._init();
  }

  public setBaseUrl(url: string): void {
    this._baseUrl = url;
  }

  public cors(config: CorsOptions): void {
    this.expressApp.use(cors(config));
  }

  public use(config: any): void {
    this.expressApp.use(config);
  }

  public defineRoutes(routers: Array<IRouterConfig>): void {
    Logger.success('Building routes...');
    Logger.info(`Setting base URL to ${this._baseUrl}`);
    this.expressApp.use(
      this._baseUrl || '',
      container.resolve(AppRouter).setRoutes(routers)
    );
    this._catchErrors();
  }

  public async listen(port: number): Promise<void> {
    await this.expressApp.listen(port);
    Logger.success(`\n📡 Server listening at localhost:${port}!`);
  }

  private _catchErrors(): void {
    ErrorController.create(this.expressApp);
  }

  private _init() {
    this.expressApp.use(express.json());
  }
}
