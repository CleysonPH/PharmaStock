import { Medicine } from '../domain/medicine-domain';
import { MedicineNotFoundError } from '../errors/medicine-not-found-error';
import { MedicineRepository } from '../repositories/medicine-repository';

export interface UpdateMedicineInput {
  id: string;
  name: string;
  description: string;
  price: number;
}

export class UpdateMedicineUseCase {
  constructor(private _medicineRepository: MedicineRepository) {}

  async execute(medicine: UpdateMedicineInput): Promise<Medicine> {
    const medicineFound = await this._medicineRepository.findById(medicine.id);

    if (!medicineFound) {
      throw new MedicineNotFoundError();
    }

    const updatedMedicine = await this._medicineRepository.update({
      ...medicine,
      quantity: medicineFound.quantity
    });

    if (!updatedMedicine) {
      throw new MedicineNotFoundError();
    }

    return updatedMedicine;
  }
}
