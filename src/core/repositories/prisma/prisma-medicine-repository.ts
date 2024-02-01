import { prisma } from '@/config/db/prisma';
import { Medicine } from '@/core/domain/medicine-domain';
import { MedicineRepository } from '../medicine-repository';

export class PrismaMedicineRepository implements MedicineRepository {
  async create(medicine: Medicine): Promise<Medicine> {
    return await prisma.medicine.create({
      data: medicine
    });
  }
}
