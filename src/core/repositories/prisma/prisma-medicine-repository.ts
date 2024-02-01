import { prisma } from '@/config/db/prisma';
import { Medicine } from '@/core/domain/medicine-domain';
import { MedicineRepository } from '../medicine-repository';

export class PrismaMedicineRepository implements MedicineRepository {

  async findById(id: string): Promise<Medicine | null> {
    return await prisma.medicine.findUnique({
      where: {
        id
      }
    });
  }

  async update(medicine: Medicine): Promise<Medicine | null> {
    return await prisma.medicine.update({
      where: {
        id: medicine.id
      },
      data: medicine
    });
  }

  async create(medicine: Medicine): Promise<Medicine> {
    return await prisma.medicine.create({
      data: medicine
    });
  }
}
