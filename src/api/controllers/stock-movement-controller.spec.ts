import { app } from '@/app';
import { randomUUID } from 'node:crypto';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

describe('StockMovementController', async () => {
  it('should create a new stock movement', async () => {
    const medicineResponse = await request(app)
      .post('/api/medicines')
      .send({
        name: 'Paracetamol',
        description: 'Painkiller',
        price: 10
      });

    const medicineId = medicineResponse.body.id;

    const response = await request(app)
      .post('/api/stock-movements')
      .send({
        medicineId,
        quantity: 10,
        type: 'IN'
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(String),
      medicineId,
      quantity: 10,
      type: 'IN',
      movementDate: expect.any(String)
    });
  });

  it('should return status 400 if medicineId is not a valid uuid', async () => {
    const response = await request(app)
      .post('/api/stock-movements')
      .send({
        medicineId: 'invalid-uuid',
        quantity: 10,
        type: 'IN'
      });

    expect(response.status).toBe(400);
  });

  it('should return status 400 if quantity is negative', async () => {
    const response = await request(app)
      .post('/api/stock-movements')
      .send({
        medicineId: 'invalid-uuid',
        quantity: -10,
        type: 'IN'
      });

    expect(response.status).toBe(400);
  });

  it('should return status 400 if type is not IN or OUT', async () => {
    const response = await request(app)
      .post('/api/stock-movements')
      .send({
        medicineId: 'invalid-uuid',
        quantity: 10,
        type: 'INVALID'
      });

    expect(response.status).toBe(400);
  });

  it('should return status 404 if medicineId does not exist', async () => {
    const response = await request(app)
      .post('/api/stock-movements')
      .send({
        medicineId: randomUUID(),
        quantity: 10,
        type: 'IN'
      });

    expect(response.status).toBe(404);
  });
});
