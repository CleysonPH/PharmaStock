import { randomUUID } from 'node:crypto';
import { beforeEach, describe, expect, it } from 'vitest';
import { User } from '../domain/user-domain';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';
import { InMemoryUserRepository } from '../repositories/inmemory/in-memory-user-repository';
import { UserRepository } from '../repositories/user-repository';
import { BcryptPasswordEncoderService } from '../services/password-encoder/bcrypt-password-encoder-service';
import { PasswordEncoderService } from '../services/password-encoder/password-encoder-service';
import { CreateUserUseCase } from './create-user-use-case';

describe('CreateMedicineUseCase', () => {
  let sut: CreateUserUseCase;
  let userRepository: UserRepository;
  let passwordEncoderService: PasswordEncoderService;
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
    sut = new CreateUserUseCase(userRepository, passwordEncoderService);
  });

  it('should create a new user', async () => {
    const email = 'test2@mail.com';
    const password = 'password';

    await sut.execute(email, password);

    const user = await userRepository.findByEmail(email);
    expect(user).toMatchObject({
      email,
      password: expect.any(String)
    });
  });

  it('should throw error if user already exists', async () => {
    const email = 'test@mail.com';
    const password = 'password';

    await expect(sut.execute(email, password)).rejects.toThrow(new UserAlreadyExistsError());
  });
});
