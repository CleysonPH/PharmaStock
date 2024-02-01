import { MedicineFactory } from '@/config/factories/medicine-factory';
import { type Request, type Response } from 'express';
import { z } from 'zod';

export class MedicineController {

  static async create (req: Request, res: Response): Promise<void> {
    const createMedicineBodySchema = z.object({
      name: z.string().min(3).max(100),
      description: z.string().min(3).max(255),
      price: z.number().positive()
    });

    const {
      name,
      description,
      price
    } = createMedicineBodySchema.parse(req.body);

    const usecase = MedicineFactory.createMedicineUseCase;
    const medicine = await usecase.execute({
      name,
      description,
      price,
      quantity: 0
    });

    res.status(201).json(medicine);
  }
}
