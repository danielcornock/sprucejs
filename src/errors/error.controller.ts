import express from 'express';

import { INext, IReq, IRes } from '../http/interfaces/middleware-params.interface';
import { ResponseFactory } from '../response/response.factory';
import { Logger } from '../utilities/logger/logger';
import { HttpException } from './exceptions/http.exception';
import { InternalServerErrorException } from './exceptions/internal-server-error.exception';

export class ErrorController {
  private readonly _app: express.Application;

  constructor(app: express.Application) {
    this._app = app;
    this.handleErrors();
  }

  static create(app: express.Application) {
    return new ErrorController(app);
  }

  public handleErrors(): void {
    this._app.use(
      (error: HttpException, _req: IReq, res: IRes, _next: INext) => {
        if (error.status) {
          ResponseFactory.error(res, error);
        } else {
          Logger.error(error);
          ResponseFactory.error(res, new InternalServerErrorException());
        }
      }
    );
  }
}
