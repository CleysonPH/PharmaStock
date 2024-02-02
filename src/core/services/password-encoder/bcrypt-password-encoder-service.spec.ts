import { beforeEach, describe, expect, it } from 'vitest';
import { BcryptPasswordEncoderService } from './bcrypt-password-encoder-service';

describe('BcryptPasswordEncoderService', () => {
  let sut: BcryptPasswordEncoderService;

  beforeEach(() => {
    sut = new BcryptPasswordEncoderService();
  });

  it('should encode password', async () => {
    const password = 'password';
    const encodedPassword = await sut.encode(password);
    expect(encodedPassword).not.toBe(password);
  });

  it('should match password', async () => {
    const password = 'password';
    const encodedPassword = await sut.encode(password);
    const matches = await sut.matches(password, encodedPassword);
    expect(matches).toBe(true);
  });
});
