import { StockMovement } from '../domain/stock-movement-domain';
import { MedicineNotFoundError } from '../errors/medicine-not-found-error';
import { OutOfStockError } from '../errors/out-of-stock-error';
import { MedicineRepository } from '../repositories/medicine-repository';
import { StockMovementRepository } from '../repositories/stock-movement-repository';

export class CreateStockMovementUseCase {
  constructor(
    private _stockMovementRepository: StockMovementRepository,
    private _medicineRepository: MedicineRepository
  ) {}

  async execute(stockMovement: StockMovement) {
    const medicine = await this._medicineRepository.findById(
      stockMovement.medicineId
    );

    if (!medicine) {
      throw new MedicineNotFoundError();
    }

    const hasStock = stockMovement.quantity > medicine.quantity;
    if (stockMovement.type === 'OUT' && hasStock) {
      throw new OutOfStockError();
    }

    const createdStockMovement = await this._stockMovementRepository.create(
      stockMovement
    );
    await this._medicineRepository.update({
      ...medicine,
      quantity:
        stockMovement.type === 'IN'
          ? medicine.quantity + stockMovement.quantity
          : medicine.quantity - stockMovement.quantity
    });

    return createdStockMovement;
  }
}
