import { MedicineRepository } from '@/core/repositories/medicine-repository';
import { PrismaMedicineRepository } from '@/core/repositories/prisma/prisma-medicine-repository';
import { CreateMedicineUseCase } from '@/core/usecases/create-medicine-use-case';

export class MedicineFactory {

  static _medicineRepositoryInstance: MedicineRepository;

  static get medicineRepository() {
    if (!this._medicineRepositoryInstance) {
      this._medicineRepositoryInstance = new PrismaMedicineRepository();
    }
    return this._medicineRepositoryInstance;
  }

  static get createMedicineUseCase() {
    return new CreateMedicineUseCase(this.medicineRepository);
  }

}
