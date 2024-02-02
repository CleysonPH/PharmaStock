import { env } from '@/config/env';
import { compare, hash } from 'bcryptjs';
import { PasswordEncoderService } from './password-encoder-service';

export class BcryptPasswordEncoderService implements PasswordEncoderService {

  async encode(password: string): Promise<string> {
    return await hash(password, env.SALT_ROUNDS);
  }

  async matches(password: string, encodedPassword: string): Promise<boolean> {
    return await compare(password, encodedPassword);
  }

}
