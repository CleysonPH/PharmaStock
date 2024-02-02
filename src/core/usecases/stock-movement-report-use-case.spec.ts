import { randomUUID } from 'node:crypto';
import { beforeEach, describe, expect, it } from 'vitest';
import { StockMovement, StockMovementType } from '../domain/stock-movement-domain';
import { InMemoryStockMovementRepository } from '../repositories/inmemory/in-memory-stock-movement-repository';
import { StockMovementRepository } from '../repositories/stock-movement-repository';
import { StockMovementReportUseCase } from './stock-movement-report-use-case';

describe('CreateMedicineUseCase', () => {
  let sut: StockMovementReportUseCase;
  let stockMovementRepository: StockMovementRepository;
  let stockMovements: StockMovement[];

  beforeEach(() => {
    stockMovements = [
      {
        id: randomUUID(),
        medicineId: randomUUID(),
        quantity: 10,
        movementDate: new Date('2021-01-01'),
        type: StockMovementType.IN
      },
      {
        id: randomUUID(),
        medicineId: randomUUID(),
        quantity: 20,
        movementDate: new Date('2021-01-02'),
        type: StockMovementType.OUT
      },
      {
        id: randomUUID(),
        medicineId: randomUUID(),
        quantity: 30,
        movementDate: new Date('2021-01-03'),
        type: StockMovementType.IN
      },
      {
        id: randomUUID(),
        medicineId: randomUUID(),
        quantity: 40,
        movementDate: new Date('2021-01-04'),
        type: StockMovementType.OUT
      }
    ];

    stockMovementRepository = new InMemoryStockMovementRepository(stockMovements);
    sut = new StockMovementReportUseCase(stockMovementRepository);
  });

  it('should return all stock movements', async () => {
    const result = await sut.execute();

    expect(result).toEqual(stockMovements);
  });

  it('should return all stock movements between two dates', async () => {
    const result = await sut.execute(new Date('2021-01-02'), new Date('2021-01-03'));

    expect(result).toEqual([stockMovements[1], stockMovements[2]]);
  });
});
