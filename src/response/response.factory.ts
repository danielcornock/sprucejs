import { HttpException } from '../errors/exceptions/http.exception';
import { IRes } from '../http/interfaces/middleware-params.interface';

export class ResponseFactory {
  static error<TError extends HttpException>(res: IRes, error: TError) {
    res.status(error.status).json(error);
  }
}
