import { StockMovement } from '../domain/stock-movement-domain';
import { StockMovementRepository } from '../repositories/stock-movement-repository';

export interface StockMovementReportOutput {
  stockMovements: StockMovement[];
  total: number;
  totalIn: number;
  totalOut: number;
  mostUsedMedicine: string;
  lessUsedMedicine: string;
}

export class StockMovementReportUseCase {

  constructor(private _stockMovementRepository: StockMovementRepository) {}

  async execute(from?: Date, to?: Date): Promise<StockMovementReportOutput> {
    const stockMovements = await this._stockMovementRepository.findAll(
      from, to
    );

    const totalIn = stockMovements.filter((sm) => sm.type === 'IN').length;
    const totalOut = stockMovements.filter((sm) => sm.type === 'OUT').length;

    return {
      stockMovements,
      total: stockMovements.length,
      totalIn,
      totalOut,
      mostUsedMedicine: this._mostUsedMedicine(stockMovements),
      lessUsedMedicine: this._lessUsedMedicine(stockMovements)
    };
  }

  private _lessUsedMedicine(stockMovements: StockMovement[]): string {
    const medicines = stockMovements.map((sm) => sm.medicineId);
    const lessUsedMedicine = [...medicines].sort(
      compareMedicine(medicines)
    ).shift();
    return lessUsedMedicine ?? '';
  }

  private _mostUsedMedicine(stockMovements: StockMovement[]): string {
    const medicines = stockMovements.map((sm) => sm.medicineId);
    const mostUsedMedicine = [...medicines].sort(
      compareMedicine(medicines)
    ).pop();
    return mostUsedMedicine ?? '';
  }
}

function compareMedicine(medicines: string[])
  : ((a: string, b: string) => number) | undefined
{
  return (a, b) => medicines.filter((medicine) => medicine === a).length -
    medicines.filter((medicine) => medicine === b).length;
}

