import { StockMovement } from '../domain/stock-movement-domain';

export interface StockMovementRepository {
  create(stockMovement: StockMovement): Promise<StockMovement>;
  findAll(from?: Date, to?: Date): Promise<StockMovement[]>;
}
