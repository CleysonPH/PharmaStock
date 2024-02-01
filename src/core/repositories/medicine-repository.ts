import { Medicine } from '../domain/medicine-domain';

export interface MedicineRepository {
  create(medicine: Medicine): Promise<Medicine>;
}
