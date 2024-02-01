import { Medicine } from '@/core/domain/medicine-domain';
import { randomUUID } from 'node:crypto';
import { MedicineRepository } from '../medicine-repository';

export class InMemoryMedicineRepository implements MedicineRepository {

  private _medicines: Medicine[];

  constructor(initialMedicines: Medicine[] = []) {
    this._medicines = initialMedicines;
  }
  findById(id: string): Promise<Medicine | null> {
    const medicine = this._medicines.find((m) => m.id === id);
    return Promise.resolve(medicine ?? null);
  }

  update(medicine: Medicine): Promise<Medicine | null> {
    const index = this._medicines.findIndex((m) => m.id === medicine.id);
    if (index === -1) {
      return Promise.resolve(null);
    }
    this._medicines[index] = medicine;
    return Promise.resolve(medicine);
  }

  create(medicine: Medicine): Promise<Medicine> {
    medicine.id = randomUUID();
    this._medicines.push(medicine);
    return Promise.resolve(medicine);
  }

}
