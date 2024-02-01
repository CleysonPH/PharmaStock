export enum StockMovementType {
  IN = 'IN',
  OUT = 'OUT',
}

export interface StockMovement {
  id?: string,
  medicineId: string,
  quantity: number,
  type: StockMovementType,
  movementDate: Date,
}
