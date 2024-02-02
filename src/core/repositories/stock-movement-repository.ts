import { StockMovement } from '../domain/stock-movement-domain';

export interface StockMovementRepository {
  create(stockMovement: StockMovement): Promise<StockMovement>;
  findAll(to: Date, from: Date): Promise<StockMovement[]>;
}
