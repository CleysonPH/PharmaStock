import { CreateMedicineUseCase } from '@/core/usecases/create-medicine-use-case';
import { type Request, type Response } from 'express';
import { z } from 'zod';

export class MedicineController {

  constructor(private _createMedicineUseCase: CreateMedicineUseCase) { }

  create (req: Request, res: Response): void {
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

    const medicine = this._createMedicineUseCase.execute({
      name,
      description,
      price,
      quantity: 0
    });

    res.status(201).json(medicine);
  }
}
