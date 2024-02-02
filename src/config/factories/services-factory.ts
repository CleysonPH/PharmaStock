import { BcryptPasswordEncoderService } from '@/core/services/password-encoder/bcrypt-password-encoder-service';
import { PasswordEncoderService } from '@/core/services/password-encoder/password-encoder-service';

export class ServicesFactory {

  static get passwordEncoderService(): PasswordEncoderService {
    return new BcryptPasswordEncoderService();
  }

}
