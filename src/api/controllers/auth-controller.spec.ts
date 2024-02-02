import { app } from '@/app';
import { ServicesFactory } from '@/config/factories/services-factory';
import { UserFactory } from '@/config/factories/user-factory';
import { User } from '@/core/domain/user-domain';
import { InMemoryUserRepository } from '@/core/repositories/inmemory/in-memory-user-repository';
import { randomUUID } from 'node:crypto';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';

describe('AuthController', async () => {
  let initialUsers: User[];

  beforeEach(async () => {
    const passwordEncoder = ServicesFactory.passwordEncoderService;
    initialUsers = [
      {
        id: randomUUID(),
        email: 'test@mail.com',
        password: await passwordEncoder.encode('password')
      }
    ];
    const repository = UserFactory.userRepository as InMemoryUserRepository;
    repository.users = initialUsers;
  });

  it('should return 401 when user is not found', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'doesnotexists@mail.com',
        password: 'password'
      });

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      message: 'Invalid credentials'
    });
  });

  it('should return 401 when password is incorrect', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@mail.com',
        password: 'incorrectpassword'
      });

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      message: 'Invalid credentials'
    });
  });

  it('should return 200 and a token when credentials are correct', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@mail.com',
        password: 'password'
      });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      token: expect.any(String)
    });
  });
});
