import { env } from '@/config/env';
import bcrypt from 'bcryptjs';
import { PasswordEncoderService } from './password-encoder-service';

export class BcryptPasswordEncoderService implements PasswordEncoderService {

  async encode(password: string): Promise<string> {
    return await bcrypt.hash(password, env.SALT_ROUNDS);
  }

  async matches(password: string, encodedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, encodedPassword);
  }

}
