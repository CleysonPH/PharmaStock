import { InvalidCredentialsError } from '@/core/errors/invalid-credentials-error';
import { NotFoundError } from '@/core/errors/not-found-error';
import { OutOfStockError } from '@/core/errors/out-of-stock-error';
import { Response } from 'express';
import { ZodError } from 'zod';

const handleNotFoundError = (error: NotFoundError, res: Response) => {
  res.status(404).json({
    message: error.message
  });
};

const handleOutOfStockError = (error: OutOfStockError, res: Response) => {
  res.status(400).json({
    message: error.message
  });
};

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

const handleInvalidCredentialsError = (
  error: InvalidCredentialsError,
  res: Response
) => {
  res.status(401).json({
    message: error.message
  });
};

const handleError = (
  error: Error,
  res: Response
) => {
  if (error instanceof NotFoundError) {
    handleNotFoundError(error, res);
    return;
  } else if (error instanceof ZodError) {
    handleZodError(error, res);
    return;
  } else if (error instanceof OutOfStockError) {
    handleOutOfStockError(error, res);
    return;
  } else if (error instanceof InvalidCredentialsError) {
    handleInvalidCredentialsError(error, res);
    return;
  }
  res.status(500).json({
    message: error.message
  });
};

export { handleError };
