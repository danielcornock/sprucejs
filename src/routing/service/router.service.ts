import { Router } from 'express';
import { autoInjectable } from 'tsyringe';

import { INext, IReq, IRes } from '../../http/interfaces/middleware-params.interface';
import { ExpressRouterFactory } from '../factories/express-router.factory';

@autoInjectable()
export class RouterService {
  public readonly router: Router;

  constructor() {
    this.router = ExpressRouterFactory.create();
  }

  static create() {
    return new RouterService();
  }

  public get(params: string, fn: Function) {
    this.router.get(params, this._tryCatch(fn, 200));
  }

  public post(params: string, fn: Function) {
    this.router.post(params, this._tryCatch(fn, 201));
  }

  public put(params: string, fn: Function) {
    this.router.put(params, this._tryCatch(fn, 201));
  }

  public delete(params: string, fn: Function) {
    this.router.delete(params, this._tryCatch(fn, 204));
  }

  public middleware(fn: Function) {
    this.router.use(this._tryCatch(fn, null));
  }

  public use(...args: any) {
    this.router.use(...args);
  }

  private _tryCatch(fn: Function, statusCode: number | null) {
    return async (req: IReq, res: IRes, next: INext) => {
      const result: any = await fn(req, res, next).catch(next);
      statusCode ? res.status(statusCode).json(result) : next();
    };
  }

  get routes() {
    return this.router;
  }
}
