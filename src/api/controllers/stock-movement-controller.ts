import { StockMovementFactory } from '@/config/factories/stock-movement-factory';
import { StockMovementType } from '@/core/domain/stock-movement-domain';
import { type Request, type Response } from 'express';
import { z } from 'zod';
import { handleError } from '../handlers';

export class StockMovementController {

  static async create(req: Request, res: Response): Promise<void> {
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

  static async report(req: Request, res: Response): Promise<void> {
    try {
      const reportStockMovementQuerySchema = z.object({
        to: z.optional(z.date()),
        from: z.optional(z.date())
      });

      const {
        from,
        to
      } = reportStockMovementQuerySchema.parse(req.query);

      const usecase = StockMovementFactory.stockMovementReportUseCase;
      const report = await usecase.execute(from, to);

      res.json(report);
    } catch (error) {
      handleError(error as Error, res);
    }
  }

}
