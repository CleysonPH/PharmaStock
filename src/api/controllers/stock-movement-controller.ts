import { StockMovementFactory } from '@/config/factories/stock-movement-factory';
import { StockMovementType } from '@/core/domain/stock-movement-domain';
import { type Request, type Response } from 'express';
import { z } from 'zod';
import { handleError } from '../handlers';

export class StockMovementController {

  static async createStockMovement(req: Request, res: Response): Promise<void> {
    try {
      const createStockMovementBodySchema = z.object({
        medicineId: z.string().uuid(),
        quantity: z.number().int().positive(),
        type: z.enum(['IN', 'OUT'])
      });

      const {
        medicineId,
        quantity,
        type
      } = createStockMovementBodySchema.parse(req.body);

      const usecase = StockMovementFactory.createStockMovementUseCase;
      const stockMovement = await usecase.execute({
        medicineId,
        quantity,
        type: type === 'IN' ? StockMovementType.IN : StockMovementType.OUT
      });

      res.status(201).json(stockMovement);
    } catch (error) {
      handleError(error as Error, res);
    }
  }

}
