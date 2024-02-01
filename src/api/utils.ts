import { Response } from 'express';
import { ZodError } from 'zod';

const handleZodError = (error: ZodError, res: Response) => {
  const errors = error.errors.map((error) => ({
    field: error.path.join('.'),
    message: error.message
  }));

  res.status(400).json({
    message: 'Validation failed',
    errors
  });
};

export { handleZodError };
