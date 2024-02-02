import { UserAlreadyExistsError } from '../errors/user-already-exists-error';
import { UserRepository } from '../repositories/user-repository';
import { PasswordEncoderService } from '../services/password-encoder/password-encoder-service';

export class CreateUserUseCase {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _passwordEncoder: PasswordEncoderService
  ) {}

  async execute(email: string, password: string): Promise<void> {
    const user = await this._userRepository.findByEmail(email);
    if (user) {
      throw new UserAlreadyExistsError();
    }
    const encodedPassword = await this._passwordEncoder.encode(password);
    await this._userRepository.create({ email, password: encodedPassword });
  }
}
