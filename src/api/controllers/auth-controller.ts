import { UserFactory } from '@/config/factories/user-factory';
import { Request, Response } from 'express';
import { z } from 'zod';
import { handleError } from '../handlers';

export class AuthController {

  static async login (req: Request, res: Response) {
    try {
      const loginBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6).max(100)
      });

      const { email, password } = loginBodySchema.parse(req.body);

      const usecase = UserFactory.authenticateUseCase;
      const token = await usecase.execute(email, password);

      res.json({ token });
    } catch (error) {
      handleError(error as Error, res);
    }
  }

}
