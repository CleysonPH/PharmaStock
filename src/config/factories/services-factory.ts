import { BcryptPasswordEncoderService } from '@/core/services/password-encoder/bcrypt-password-encoder-service';
import { PasswordEncoderService } from '@/core/services/password-encoder/password-encoder-service';
import { JsonWebTokenTokenService } from '@/core/services/token/jsonwebtoken-token-service';

export class ServicesFactory {

  static get passwordEncoderService(): PasswordEncoderService {
    return new BcryptPasswordEncoderService();
  }

  static get tokenService() {
    return new JsonWebTokenTokenService();
  }

}
