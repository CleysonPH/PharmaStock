import { NotFoundError } from './not-found-error';

export class MedicineNotFoundError extends NotFoundError {
  constructor(message: string = 'Medicine not found') {
    super(message);
  }
}
