import { AuthMiddleware } from '../../authentication/services/auth.middleware';
import { RouterService } from '../service/router.service';
import { CoreRouter } from './core-router.abstract';

export class ProtectedRouter extends CoreRouter {
  constructor(routerService: RouterService, authMiddleware: AuthMiddleware) {
    super(routerService);
    routerService.use(authMiddleware.validate);
  }
}
