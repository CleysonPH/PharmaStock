import { randomUUID } from 'node:crypto';
import { beforeEach, describe, expect, it } from 'vitest';
import { Medicine } from '../domain/medicine-domain';
import { InMemoryMedicineRepository } from '../repositories/inmemory/in-memory-medicien-repository';
import { MedicineRepository } from '../repositories/medicine-repository';
import { CreateMedicineUseCase } from './create-medicine-use-case';

describe('CreateMedicineUseCase', () => {
  let sut: CreateMedicineUseCase;
  let medicineRepository: MedicineRepository;
  let medicines: Medicine[];

  beforeEach(() => {
    medicines = [
      {
        id: randomUUID(),
        name: 'Medicine 1',
        description: 'Description 1',
        price: 100,
        quantity: 10
      }
    ];

    medicineRepository = new InMemoryMedicineRepository(medicines);
    sut = new CreateMedicineUseCase(medicineRepository);
  });

  it('should create a new medicine', async () => {
    const newMedicine: Medicine = {
      name: 'Medicine 2',
      description: 'Description 2',
      price: 200,
      quantity: 20
    };

    const createdMedicine = await sut.execute(newMedicine);

    expect(createdMedicine).toMatchObject({
      ...newMedicine,
      id: expect.any(String)
    });
  });
});
