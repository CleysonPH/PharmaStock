import { prisma } from '@/config/db/prisma';
import { StockMovement, StockMovementType } from '@/core/domain/stock-movement-domain';
import { StockMovementRepository } from '../stock-movement-repository';

export class PrismaStockMovementRepository implements StockMovementRepository {

  async findAll(from?: Date, to?: Date): Promise<StockMovement[]> {
    const stockMovements = await prisma.stockMovement.findMany({
      where: {
        movementDate: {
          gte: from,
          lte: to
        }
      }
    });

    return stockMovements.map((stockMovement) => {
      const type = stockMovement.type === 'IN'
        ? StockMovementType.IN
        : StockMovementType.OUT;

      return {
        id: stockMovement.id,
        medicineId: stockMovement.medicineId,
        quantity: stockMovement.quantity,
        movementDate: stockMovement.movementDate,
        type
      };
    });
  }

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
