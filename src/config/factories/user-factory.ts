import { InMemoryUserRepository } from '@/core/repositories/inmemory/in-memory-user-repository';
import { PrismaUserRepository } from '@/core/repositories/prisma/prisma-user-repository';
import { UserRepository } from '@/core/repositories/user-repository';
import { CreateUserUseCase } from '@/core/usecases/create-user-use-case';
import { env } from '../env';
import { ServicesFactory } from './services-factory';

export class UserFactory {
  private static _userRepositoryInstance: UserRepository;

  static get userRepository() {
    if (!this._userRepositoryInstance) {
      this._userRepositoryInstance = env.NODE_ENV === 'test'
        ? new InMemoryUserRepository()
        : new PrismaUserRepository();
    }
    return this._userRepositoryInstance;
  }

  static get createUserUseCase() {
    return new CreateUserUseCase(
      this.userRepository,
      ServicesFactory.passwordEncoderService
    );
  }
}
