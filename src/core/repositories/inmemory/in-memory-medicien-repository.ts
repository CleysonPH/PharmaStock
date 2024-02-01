import { Medicine } from '@/core/domain/medicine-domain';
import { randomUUID } from 'node:crypto';
import { MedicineRepository } from '../medicine-repository';

export class InMemoryMedicineRepository implements MedicineRepository {

  private _medicines: Medicine[];

  constructor(initialMedicines: Medicine[] = []) {
    this._medicines = initialMedicines;
  }

  create(medicine: Medicine): Promise<Medicine> {
    medicine.id = randomUUID();
    this._medicines.push(medicine);
    return Promise.resolve(medicine);
  }

}
