import { UserFactory } from '@/config/factories/user-factory';
import inquirer from 'inquirer';

export async function createUserCmd() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'email',
      message: 'Enter email:'
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter password:'
    }
  ]);

  const { email, password } = answers;
  const usecase = UserFactory.createUserUseCase;

  try {
    await usecase.execute(email, password);
    console.log('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

createUserCmd();

