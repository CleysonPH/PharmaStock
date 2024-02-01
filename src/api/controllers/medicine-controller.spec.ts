import { app } from '@/app';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

describe('MedicineController', async () => {
  it('should create a new medicine', async () => {
    const response = await request(app)
      .post('/api/medicines')
      .send({
        name: 'Paracetamol',
        description: 'Painkiller',
        price: 10
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(String),
      name: 'Paracetamol',
      description: 'Painkiller',
      price: 10,
      quantity: 0
    });
  });

  it('should return status 400 if name is less than 3 characters', async () => {
    const response = await request(app)
      .post('/api/medicines')
      .send({
        name: 'Pa',
        description: 'Painkiller',
        price: 10
      });

    expect(response.status).toBe(400);
  });

  it('should return status 400 if description is less than 3 characters', async () => {
    const response = await request(app)
      .post('/api/medicines')
      .send({
        name: 'Paracetamol',
        description: 'Pa',
        price: 10
      });

    expect(response.status).toBe(400);
  });

  it('should return status 400 if price is negative', async () => {
    const response = await request(app)
      .post('/api/medicines')
      .send({
        name: 'Paracetamol',
        description: 'Painkiller',
        price: -10
      });

    expect(response.status).toBe(400);
  });

  it('should return status 400 if price is zero', async () => {
    const response = await request(app)
      .post('/api/medicines')
      .send({
        name: 'Paracetamol',
        description: 'Painkiller',
        price: 0
      });

    expect(response.status).toBe(400);
  });

  it('should return status 400 if price is not a number', async () => {
    const response = await request(app)
      .post('/api/medicines')
      .send({
        name: 'Paracetamol',
        description: 'Painkiller',
        price: '10'
      });

    expect(response.status).toBe(400);
  });

  it('should return status 400 if name is not a string', async () => {
    const response = await request(app)
      .post('/api/medicines')
      .send({
        name: 10,
        description: 'Painkiller',
        price: 10
      });

    expect(response.status).toBe(400);
  });

  it('should return status 400 if description is not a string', async () => {
    const response = await request(app)
      .post('/api/medicines')
      .send({
        name: 'Paracetamol',
        description: 10,
        price: 10
      });

    expect(response.status).toBe(400);
  });

  it('should return status 400 if name is more than 100 characters', async () => {
    const response = await request(app)
      .post('/api/medicines')
      .send({
        name: 'a'.repeat(101),
        description: 'Painkiller',
        price: 10
      });

    expect(response.status).toBe(400);
  });

  it('should return status 400 if description is more than 255 characters', async () => {
    const response = await request(app)
      .post('/api/medicines')
      .send({
        name: 'Paracetamol',
        description: 'a'.repeat(256),
        price: 10
      });

    expect(response.status).toBe(400);
  });

  it('should return status 400 if name is missing', async () => {
    const response = await request(app)
      .post('/api/medicines')
      .send({
        description: 'Painkiller',
        price: 10
      });

    expect(response.status).toBe(400);
  });

  it('should return status 400 if description is missing', async () => {
    const response = await request(app)
      .post('/api/medicines')
      .send({
        name: 'Paracetamol',
        price: 10
      });

    expect(response.status).toBe(400);
  });

  it('should return status 400 if price is missing', async () => {
    const response = await request(app)
      .post('/api/medicines')
      .send({
        name: 'Paracetamol',
        description: 'Painkiller'
      });

    expect(response.status).toBe(400);
  });
});
