import { beforeEach, describe, expect, it } from 'vitest';
import { JsonWebTokenTokenService } from './jsonwebtoken-token-service';

describe('BcryptPasswordEncoderService', () => {
  let sut: JsonWebTokenTokenService;

  beforeEach(() => {
    sut = new JsonWebTokenTokenService();
  });

  it('should generate token', async () => {
    const token = await sut.generateToken('test@mail.com');
    expect(token).not.toBe('');
    expect(token.split('.').length).toBe(3);
  });

  it('should return sub from token', async () => {
    const token = await sut.generateToken('test@mail.com');
    const sub = await sut.getSubject(token);
    expect(sub).toBe('test@mail.com');
  });
});
