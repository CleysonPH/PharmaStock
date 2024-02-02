import { env } from '@/config/env';
import { sign, verify } from 'jsonwebtoken';
import { TokenService } from './token-service';

export class JsonWebTokenTokenService implements TokenService {

  async generateToken(subject: string): Promise<string> {
    return sign(
      subject, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRATION }
    );
  }

  async getSubject(token: string): Promise<string> {
    const decoded = verify(token, env.JWT_SECRET);
    return decoded.sub as string;
  }

}
