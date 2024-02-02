import { app } from '@/app';
import { MedicineFactory } from '@/config/factories/medicine-factory';
import { Medicine } from '@/core/domain/medicine-domain';
import { InMemoryMedicineRepository } from '@/core/repositories/inmemory/in-memory-medicine-repository';
import { randomUUID } from 'node:crypto';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';

describe('MedicineController', async () => {
  let initialMedicines: Medicine[];

  beforeEach(async () => {
    initialMedicines = [
      {
        id: randomUUID(),
        name: 'Paracetamol',
        description: 'Painkiller',
        price: 10,
        quantity: 0
      },
      {
        id: randomUUID(),
        name: 'Ibuprofen',
        description: 'Anti-inflammatory',
        price: 15,
        quantity: 0
      },
      {
        id: randomUUID(),
        name: 'Omeprazole',
        description: 'Gastric protector',
        price: 20,
        quantity: 0
      }
    ];
    const repository = MedicineFactory.medicineRepository as InMemoryMedicineRepository;
    repository.medicines = initialMedicines;
  });

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

  it('should return status 200 if medicine is updated', async () => {
    const creationResponse = await request(app)
      .post('/api/medicines')
      .send({
        name: 'Paracetamol',
        description: 'Painkiller',
        price: 10
      });

    const { id } = creationResponse.body;

    const response = await request(app)
      .put(`/api/medicines/${ id }`)
      .send({
        name: 'Paracetamol 500mg',
        description: 'Painkiller Edited',
        price: 20
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id,
      name: 'Paracetamol 500mg',
      description: 'Painkiller Edited',
      price: 20,
      quantity: 0
    });
  });

  it('should return status 400 if id is not a uuid', async () => {
    const response = await request(app)
      .put('/api/medicines/123')
      .send({
        name: 'Paracetamol 500mg',
        description: 'Painkiller Edited',
        price: 20
      });

    expect(response.status).toBe(400);
  });

  it('should return status 404 if medicine is not found', async () => {
    const response = await request(app)
      .put(`/api/medicines/${ randomUUID() }`)
      .send({
        name: 'Paracetamol 500mg',
        description: 'Painkiller Edited',
        price: 20
      });

    expect(response.status).toBe(404);
  });

  it('should return status 200 with all medicines', async () => {
    const response = await request(app)
      .get('/api/medicines');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(initialMedicines);
  });
});
