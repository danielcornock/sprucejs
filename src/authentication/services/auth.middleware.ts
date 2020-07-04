import { injectable } from 'tsyringe';

import { INext, IReq, IRes } from '../../http';

@injectable()
export class AuthMiddleware {
  constructor() {
    console.log('hey');
  }
  public async validate(req: IReq, res: IRes, next: INext): Promise<void> {
    next();
  }
}
