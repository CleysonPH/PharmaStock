import { User } from '@/core/domain/user-domain';
import { randomUUID } from 'node:crypto';
import { UserRepository } from '../user-repository';

export class InMemoryUserRepository implements UserRepository {

  private _users: User[];

  constructor(users: User[] = []) {
    this._users = users;
  }

  set users(users: User[]) {
    this._users = users;
  }

  async create(user: User): Promise<User> {
    user.id = randomUUID();
    this._users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this._users.find((user) => user.email === email);
    return user ?? null;
  }

  async findById(id: string): Promise<User | null> {
    const user = this._users.find((user) => user.id === id);
    return user ?? null;
  }
}
