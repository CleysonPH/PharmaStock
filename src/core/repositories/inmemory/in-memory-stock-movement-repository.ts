import { StockMovement } from '@/core/domain/stock-movement-domain';
import { randomUUID } from 'node:crypto';
import { StockMovementRepository } from '../stock-movement-repository';

export class InMemoryStockMovementRepository implements
  StockMovementRepository
{

  private _stockMovements: StockMovement[];

  constructor(initialStockMovements: StockMovement[] = []) {
    this._stockMovements = initialStockMovements;
  }

  create(stockMovement: StockMovement): Promise<StockMovement> {
    stockMovement.id = randomUUID();
    this._stockMovements.push(stockMovement);
    return Promise.resolve(stockMovement);
  }

  findAll(from?: Date, to?: Date): Promise<StockMovement[]> {
    if (to && from) {
      return Promise.resolve(
        this._stockMovements.filter(
          (sm) => sm.movementDate >= from && sm.movementDate <= to
        )
      );
    }
    return Promise.resolve(this._stockMovements);
  }
}
