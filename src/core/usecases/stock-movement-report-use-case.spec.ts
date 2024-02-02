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
  const medicines = [randomUUID(), randomUUID()];

  beforeEach(() => {

    stockMovements = [
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

    stockMovementRepository = new InMemoryStockMovementRepository(stockMovements);
    sut = new StockMovementReportUseCase(stockMovementRepository);
  });

  it('should return the stock movements report', async () => {
    const report = await sut.execute();
    expect(report).toEqual({
      stockMovements,
      total: 5,
      totalIn: 3,
      totalOut: 2,
      mostUsedMedicine: medicines[0],
      lessUsedMedicine: medicines[1]
    });
  });

  it('should return the stock movements report filtered by date', async () => {
    const report = await sut.execute(new Date('2021-01-02'), new Date('2021-01-04'));
    expect(report).toEqual({
      stockMovements: stockMovements.slice(1, 4),
      total: 3,
      totalIn: 1,
      totalOut: 2,
      mostUsedMedicine: medicines[1],
      lessUsedMedicine: medicines[0]
    });
  });
});
