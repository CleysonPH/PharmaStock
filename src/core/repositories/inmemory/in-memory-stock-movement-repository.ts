import { StockMovement } from '@/core/domain/stock-movement-domain';
import { randomUUID } from 'node:crypto';
import { StockMovementRepository } from '../stock-movement-repository';

export class InMemoryStockMovementRepository implements
  StockMovementRepository
{

  private stockMovements: StockMovement[] = [];

  create(stockMovement: StockMovement): Promise<StockMovement> {
    stockMovement.id = randomUUID();
    this.stockMovements.push(stockMovement);
    return Promise.resolve(stockMovement);
  }
}
