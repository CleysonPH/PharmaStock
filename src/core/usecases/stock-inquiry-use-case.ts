import { Medicine } from '../domain/medicine-domain';
import { MedicineRepository } from '../repositories/medicine-repository';

export class StockInquiryUseCase {
  constructor(private _medicineRepository: MedicineRepository) {}

  async execute(): Promise<Medicine[]> {
    return await this._medicineRepository.findAll();
  }
}
