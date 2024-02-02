import { InvalidCredentialsError } from '../errors/invalid-credentials-error';
import { UserRepository } from '../repositories/user-repository';
import { PasswordEncoderService } from '../services/password-encoder/password-encoder-service';
import { TokenService } from '../services/token/token-service';

export class AuthenticateUseCase {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _passwordEncoderService: PasswordEncoderService,
    private readonly _tokenService: TokenService
  ) {}

  async execute(email: string, password: string): Promise<string> {
    const user = await this._userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const passwordMatch = await this._passwordEncoderService.matches(
      password,
      user.password
    );

    if (!passwordMatch) {
      throw new InvalidCredentialsError();
    }

    const token = await this._tokenService.generateToken(user.email);

    return token;
  }
}
