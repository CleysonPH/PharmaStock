import { MedicineFactory } from '@/config/factories/medicine-factory';
import { type Request, type Response } from 'express';
import { z } from 'zod';
import { handleError } from '../handlers';

export class MedicineController {

  static async create (req: Request, res: Response) {
    try {
      const createMedicineBodySchema = z.object({
        name: z.string().min(3).max(100),
        description: z.string().min(3).max(255),
        price: z.number().positive()
      });

      const { name, description, price } = createMedicineBodySchema.parse(
        req.body
      );

      const usecase = MedicineFactory.createMedicineUseCase;
      const medicine = await usecase.execute({
        name,
        description,
        price,
        quantity: 0
      });

      res.status(201).json(medicine);
    } catch (error) {
      handleError(error as Error, res);
    }
  }

  static async update (req: Request, res: Response) {
    try {
      const updateMedicineParamsSchema = z.object({
        id: z.string().uuid()
      });

      const { id } = updateMedicineParamsSchema.parse(req.params);

      const updateMedicineBodySchema = z.object({
        name: z.string().min(3).max(100),
        description: z.string().min(3).max(255),
        price: z.number().positive()
      });

      const { name, description, price } = updateMedicineBodySchema.parse(
        req.body
      );

      const usecase = MedicineFactory.updateMedicineUseCase;
      const medicine = await usecase.execute({
        id,
        name,
        description,
        price
      });

      res.json(medicine);
    }
    catch (error) {
      handleError(error as Error, res);
    }
  }
}
