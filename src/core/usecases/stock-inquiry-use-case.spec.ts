import { randomUUID } from 'node:crypto';
import { beforeEach, describe, expect, it } from 'vitest';
import { Medicine } from '../domain/medicine-domain';
import { InMemoryMedicineRepository } from '../repositories/inmemory/in-memory-medicine-repository';
import { MedicineRepository } from '../repositories/medicine-repository';
import { StockInquiryUseCase } from './stock-inquiry-use-case';

describe('CreateMedicineUseCase', () => {
  let sut: StockInquiryUseCase;
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
      },
      {
        id: randomUUID(),
        name: 'Medicine 2',
        description: 'Description 2',
        price: 200,
        quantity: 20
      },
      {
        id: randomUUID(),
        name: 'Medicine 3',
        description: 'Description 3',
        price: 300,
        quantity: 30
      },
      {
        id: randomUUID(),
        name: 'Medicine 4',
        description: 'Description 4',
        price: 400,
        quantity: 40
      }
    ];

    medicineRepository = new InMemoryMedicineRepository(medicines);
    sut = new StockInquiryUseCase(medicineRepository);
  });

  it('should return all medicines', async () => {
    const result = await sut.execute();

    expect(result).toMatchObject(medicines);
  });
});
