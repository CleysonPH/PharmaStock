import { prisma } from '@/config/db/prisma';
import { StockMovement, StockMovementType } from '@/core/domain/stock-movement-domain';
import { StockMovementRepository } from '../stock-movement-repository';

export class PrismaStockMovementRepository implements StockMovementRepository {

  async create(stockMovement: StockMovement): Promise<StockMovement> {
    const createdStockMovement = await prisma.stockMovement.create({
      data: {
        id: stockMovement.id,
        medicineId: stockMovement.medicineId,
        quantity: stockMovement.quantity,
        type: stockMovement.type
      }
    });

    const type = createdStockMovement.type === 'IN'
      ? StockMovementType.IN
      : StockMovementType.OUT;

    return {
      id: createdStockMovement.id,
      medicineId: createdStockMovement.medicineId,
      quantity: createdStockMovement.quantity,
      movementDate: createdStockMovement.movementDate,
      type
    };
  }
}
