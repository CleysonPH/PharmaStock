import { InMemoryStockMovementRepository } from '@/core/repositories/inmemory/in-memory-stock-movement-repository';
import { PrismaStockMovementRepository } from '@/core/repositories/prisma/prisma-stock-movement-repository';
import { StockMovementRepository } from '@/core/repositories/stock-movement-repository';
import { CreateStockMovementUseCase } from '@/core/usecases/create-stock-movement-use-case';
import { env } from '../env';
import { MedicineFactory } from './medicine-factory';

export class StockMovementFactory {

  private static _stockMovementRepositoryInstance: StockMovementRepository;

  static get stockMovementRepository() {
    if (!this._stockMovementRepositoryInstance) {
      this._stockMovementRepositoryInstance = env.NODE_ENV === 'test'
        ? new InMemoryStockMovementRepository()
        : new PrismaStockMovementRepository();
    }
    return this._stockMovementRepositoryInstance;
  }

  static get createStockMovementUseCase() {
    return new CreateStockMovementUseCase(
      this.stockMovementRepository,
      MedicineFactory.medicineRepository
    );
  }

}
