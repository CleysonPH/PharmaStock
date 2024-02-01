import { InMemoryMedicineRepository } from '@/core/repositories/inmemory/in-memory-medicien-repository';
import { MedicineRepository } from '@/core/repositories/medicine-repository';
import { PrismaMedicineRepository } from '@/core/repositories/prisma/prisma-medicine-repository';
import { CreateMedicineUseCase } from '@/core/usecases/create-medicine-use-case';
import { env } from '../env';

export class MedicineFactory {

  static _medicineRepositoryInstance: MedicineRepository;

  static get medicineRepository() {
    if (!this._medicineRepositoryInstance) {
      this._medicineRepositoryInstance = env.NODE_ENV === 'test'
        ? new InMemoryMedicineRepository()
        : new PrismaMedicineRepository();
    }
    return this._medicineRepositoryInstance;
  }

  static get createMedicineUseCase() {
    return new CreateMedicineUseCase(this.medicineRepository);
  }

}