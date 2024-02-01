import { Medicine } from '../domain/medicine-domain';

export interface MedicineRepository {
  create(medicine: Medicine): Promise<Medicine>;
  update(medicine: Medicine): Promise<Medicine | null>;
  findById(id: string): Promise<Medicine | null>;
}
