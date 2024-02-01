import { randomUUID } from 'node:crypto';
import { beforeEach, describe, expect, it } from 'vitest';
import { Medicine } from '../domain/medicine-domain';
import { StockMovementType } from '../domain/stock-movement-domain';
import { InMemoryMedicineRepository } from '../repositories/inmemory/in-memory-medicine-repository';
import { InMemoryStockMovementRepository } from '../repositories/inmemory/in-memory-stock-movement-repository';
import { MedicineRepository } from '../repositories/medicine-repository';
import { StockMovementRepository } from '../repositories/stock-movement-repository';
import { CreateStockMovementUseCase } from './create-stock-movement-use-case';

describe('CreateMedicineUseCase', () => {
  let sut: CreateStockMovementUseCase;
  let medicineRepository: MedicineRepository;
  let stockMovementRepository: StockMovementRepository;
  let medicines: Medicine[];

  beforeEach(() => {
    medicines = [
      {
        id: randomUUID(),
        name: 'Medicine 1',
        description: 'Description 1',
        price: 100,
        quantity: 10
      }
    ];

    medicineRepository = new InMemoryMedicineRepository(medicines);
    stockMovementRepository = new InMemoryStockMovementRepository();
    sut = new CreateStockMovementUseCase(stockMovementRepository, medicineRepository);
  });

  it('should create a new stock movement', async () => {
    const stockMovement = {
      medicineId: medicines[0].id as string,
      quantity: 5,
      type: StockMovementType.IN
    };

    const createdStockMovement = await sut.execute(stockMovement);

    expect(createdStockMovement).toMatchObject({
      ...stockMovement,
      id: expect.any(String),
      movementDate: expect.any(Date)
    });
    expect(medicines[0].quantity).toBe(15);
  });

  it('should throw an error when trying to create an out stock movement', async () => {
    const stockMovement = {
      medicineId: medicines[0].id as string,
      quantity: 15,
      type: StockMovementType.OUT
    };

    expect(sut.execute(stockMovement)).rejects.toThrowError('Insufficient stock');
  });

  it('should throw an error when trying to create a stock movement for a non existing medicine', async () => {
    const stockMovement = {
      medicineId: randomUUID(),
      quantity: 15,
      type: StockMovementType.OUT
    };

    expect(sut.execute(stockMovement)).rejects.toThrowError('Medicine not found');
  });
});
