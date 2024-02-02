import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUserRepository } from '../repositories/inmemory/in-memory-user-repository';
import { UserRepository } from '../repositories/user-repository';
import { BcryptPasswordEncoderService } from '../services/password-encoder/bcrypt-password-encoder-service';
import { PasswordEncoderService } from '../services/password-encoder/password-encoder-service';
import { CreateUserUseCase } from './create-user-use-case';

describe('CreateMedicineUseCase', () => {
  let sut: CreateUserUseCase;
  let userRepository: UserRepository;
  let passwordEncoderService: PasswordEncoderService;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    passwordEncoderService = new BcryptPasswordEncoderService();
    sut = new CreateUserUseCase(userRepository, passwordEncoderService);
  });

  it('should create a new user', async () => {
    const email = 'test@mail.com';
    const password = 'password';

    await sut.execute(email, password);

    const user = await userRepository.findByEmail(email);
    expect(user).toMatchObject({
      email,
      password: expect.any(String)
    });
  });
});
