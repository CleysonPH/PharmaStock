import { StockMovement } from '../domain/stock-movement-domain';
import { StockMovementRepository } from '../repositories/stock-movement-repository';

export class StockMovementReportUseCase {

  constructor(private _stockMovementRepository: StockMovementRepository) {}

  async execute(from?: Date, to?: Date): Promise<StockMovement[]> {
    return await this._stockMovementRepository.findAll(from, to);
  }
}
