import { randomUUID } from 'node:crypto';
import { beforeEach, describe, expect, it } from 'vitest';
import { Medicine } from '../domain/medicine-domain';
import { InMemoryMedicineRepository } from '../repositories/inmemory/in-memory-medicine-repository';
import { MedicineRepository } from '../repositories/medicine-repository';
import { UpdateMedicineUseCase } from './update-medicine-use-case';

describe('CreateMedicineUseCase', () => {
  let sut: UpdateMedicineUseCase;
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
    sut = new UpdateMedicineUseCase(medicineRepository);
  });

  it('should update a medicine', async () => {
    const medicine = {
      id: medicines[0].id as string,
      name: 'Medicine 1',
      description: 'Description 1',
      price: 200
    };

    const updatedMedicine = await sut.execute(medicine);

    expect(updatedMedicine).toEqual(
      {
        id: medicines[0].id,
        name: 'Medicine 1',
        description: 'Description 1',
        price: 200,
        quantity: 10
      }
    );
  });

  it('should throw an error when medicine is not found', async () => {
    const medicine = {
      id: randomUUID(),
      name: 'Medicine 1',
      description: 'Description 1',
      price: 200
    };

    expect(sut.execute(medicine)).rejects.toThrow('Medicine not found');
  });
});
