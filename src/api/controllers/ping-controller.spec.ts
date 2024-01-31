import { app } from '@/app';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

describe('PingController', async () => {
  it('should return status 200 and pong message', async () => {
    const response = await request(app).get('/api/ping').send();
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'pong' });
  });
});
