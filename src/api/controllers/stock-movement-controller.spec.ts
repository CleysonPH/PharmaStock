import { app } from '@/app';
import { StockMovementFactory } from '@/config/factories/stock-movement-factory';
import { StockMovementType } from '@/core/domain/stock-movement-domain';
import { InMemoryStockMovementRepository } from '@/core/repositories/inmemory/in-memory-stock-movement-repository';
import { randomUUID } from 'node:crypto';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';

describe('StockMovementController', async () => {
  beforeEach(async () => {
    const medicines = [randomUUID(), randomUUID()];
    const stockMovements = [
      {
        id: randomUUID(),
        medicineId: medicines[0],
        quantity: 10,
        type: StockMovementType.IN,
        movementDate: new Date('2021-01-01')
      },
      {
        id: randomUUID(),
        medicineId: medicines[1],
        quantity: 5,
        type: StockMovementType.IN,
        movementDate: new Date('2021-01-02')
      },
      {
        id: randomUUID(),
        medicineId: medicines[0],
        quantity: 2,
        type: StockMovementType.OUT,
        movementDate: new Date('2021-01-03')
      },
      {
        id: randomUUID(),
        medicineId: medicines[1],
        quantity: 3,
        type: StockMovementType.OUT,
        movementDate: new Date('2021-01-04')
      },
      {
        id: randomUUID(),
        medicineId: medicines[0],
        quantity: 7,
        type: StockMovementType.IN,
        movementDate: new Date('2021-01-05')
      }
    ];
    const repository = StockMovementFactory.stockMovementRepository as InMemoryStockMovementRepository;
    repository.stockMovements = stockMovements;
  });

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

  it('should return status 400 if medicine is out of stock', async () => {
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
        type: 'OUT'
      });

    expect(response.status).toBe(400);
  });

  it('should return the stock movements report', async () => {
    const response = await request(app)
      .get('/api/stock-movements/report');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      stockMovements: [
        {
          id: expect.any(String),
          medicineId: expect.any(String),
          quantity: 10,
          type: 'IN',
          movementDate: expect.any(String)
        },
        {
          id: expect.any(String),
          medicineId: expect.any(String),
          quantity: 5,
          type: 'IN',
          movementDate: expect.any(String)
        },
        {
          id: expect.any(String),
          medicineId: expect.any(String),
          quantity: 2,
          type: 'OUT',
          movementDate: expect.any(String)
        },
        {
          id: expect.any(String),
          medicineId: expect.any(String),
          quantity: 3,
          type: 'OUT',
          movementDate: expect.any(String)
        },
        {
          id: expect.any(String),
          medicineId: expect.any(String),
          quantity: 7,
          type: 'IN',
          movementDate: expect.any(String)
        }
      ],
      total: 5,
      totalIn: 3,
      totalOut: 2,
      mostUsedMedicine: expect.any(String),
      lessUsedMedicine: expect.any(String)
    });
  });

  it('should return the stock movements report filtered by date', async () => {
    const response = await request(app)
      .get('/api/stock-movements/report')
      .query({ from: '2021-01-02', to: '2021-01-04' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      stockMovements: [
        {
          id: expect.any(String),
          medicineId: expect.any(String),
          quantity: 5,
          type: 'IN',
          movementDate: expect.any(String)
        },
        {
          id: expect.any(String),
          medicineId: expect.any(String),
          quantity: 2,
          type: 'OUT',
          movementDate: expect.any(String)
        },
        {
          id: expect.any(String),
          medicineId: expect.any(String),
          quantity: 3,
          type: 'OUT',
          movementDate: expect.any(String)
        }
      ],
      total: 3,
      totalIn: 1,
      totalOut: 2,
      mostUsedMedicine: expect.any(String),
      lessUsedMedicine: expect.any(String)
    });
  });

  it('should return status 400 if from is not a valid date', async () => {
    const response = await request(app)
      .get('/api/stock-movements/report')
      .query({ from: 'invalid-date' });

    expect(response.status).toBe(400);
  });
});
