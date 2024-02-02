import { prisma } from '@/config/db/prisma';
import { User } from '@/core/domain/user-domain';
import { UserRepository } from '../user-repository';

export class PrismaUserRepository implements UserRepository {

  async create(user: User): Promise<User> {
    return await prisma.user.create({ data: user });
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
  }
}
