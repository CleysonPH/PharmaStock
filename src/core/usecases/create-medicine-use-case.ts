import { Medicine } from '../domain/medicine-domain';
import { MedicineRepository } from '../repositories/medicine-repository';

export class CreateMedicineUseCase {
  constructor(private _medicineRepository: MedicineRepository) {}

  async execute(medicine: Medicine): Promise<Medicine> {
    return await this._medicineRepository.create(medicine);
  }
}
