import { randomUUID } from 'node:crypto';
import { beforeEach, describe, expect, it } from 'vitest';
import { User } from '../domain/user-domain';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';
import { InMemoryUserRepository } from '../repositories/inmemory/in-memory-user-repository';
import { UserRepository } from '../repositories/user-repository';
import { BcryptPasswordEncoderService } from '../services/password-encoder/bcrypt-password-encoder-service';
import { PasswordEncoderService } from '../services/password-encoder/password-encoder-service';
import { JsonWebTokenTokenService } from '../services/token/jsonwebtoken-token-service';
import { TokenService } from '../services/token/token-service';
import { AuthenticateUseCase } from './authenticate-use-case';

describe('CreateMedicineUseCase', () => {
  let sut: AuthenticateUseCase;
  let userRepository: UserRepository;
  let passwordEncoderService: PasswordEncoderService;
  let tokenService: TokenService;
  let users: User[];

  beforeEach(async () => {
    passwordEncoderService = new BcryptPasswordEncoderService();

    users = [
      {
        id: randomUUID(),
        email: 'test@mail.com',
        password: await passwordEncoderService.encode('password')
      }
    ];

    userRepository = new InMemoryUserRepository(users);
    tokenService = new JsonWebTokenTokenService();
    sut = new AuthenticateUseCase(
      userRepository, passwordEncoderService, tokenService
    );
  });

  it('should authenticate a user', async () => {
    const email = 'test@mail.com';
    const password = 'password';

    const token = await sut.execute(email, password);

    expect(token).toBeDefined();
  });

  it('should throw an error when the user does not exist', async () => {
    const email = 'doesnotexists@mail.com';
    const password = 'password';

    await expect(sut.execute(email, password)).rejects.toThrow(new InvalidCredentialsError());
  });

  it('should throw an error when the password is incorrect', async () => {
    const email = 'test@mail.com';
    const password = 'incorrectpassword';

    await expect(sut.execute(email, password)).rejects.toThrow(new InvalidCredentialsError());
  });
});
