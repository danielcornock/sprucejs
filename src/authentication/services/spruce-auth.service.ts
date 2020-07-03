import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { autoInjectable } from 'tsyringe';

import { IJwtConfig } from '../interfaces/jwt-config.interface';

@autoInjectable()
export class SpruceAuthService {
  constructor() {}

  public hash(password: string, strength?: number): Promise<string> {
    return hash(password, strength || 12);
  }

  public isPasswordMatch(
    testPassword: string,
    controlPassword: string
  ): Promise<boolean> {
    return compare(testPassword, controlPassword);
  }

  public createJwt(jwtConfig: IJwtConfig): string {
    return sign(jwtConfig.payload, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn
    });
  }
}
