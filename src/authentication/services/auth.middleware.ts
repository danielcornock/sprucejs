import { injectable } from 'tsyringe';

import { INext, IRes } from '../../http';

@injectable()
export class AuthMiddleware {
  constructor() {
    console.log('hey');
  }
  public async validate(req: IRes, res: IRes, next: INext): Promise<void> {
    next();
  }
}
