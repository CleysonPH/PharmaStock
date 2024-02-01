export class OutOfStockError extends Error {
  constructor(message: string = 'Insufficient stock') {
    super(message);
  }
}
