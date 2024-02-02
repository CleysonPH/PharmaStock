import { AlreadyExistsError } from './already-exists-error';

export class UserAlreadyExistsError extends AlreadyExistsError {
  constructor(message: string = 'User already exists') {
    super(message);
  }
}
