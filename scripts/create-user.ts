import { hash } from 'bcrypt-ts';
import { input, password, select } from '@inquirer/prompts';
import { PrismaClient } from '@prisma/client'

// TODO: add to environment variables
const saltRounds = 10;
const db = new PrismaClient();

// User roles must be defined also, because the import from
// auth.ts doesn't work in the script
enum Role {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  USER = "USER",
}

const createUser = async () => {
  // Promps for user details
  const username = await input({ message: 'Käyttäjänimi:', required: true });
  const passwordValue = await password({ message: 'Salasana:', mask: '*' });
  const role = await select({
    message: 'Käyttäjärooli:',
    choices: [
      {
        name: 'Ylläpitäjä',
        value: Role.ADMIN
      },
      {
        name: 'Moderaattori',
        value: Role.MODERATOR
      },
      {
        name: 'Peruskäyttäjä',
        value: Role.USER
      }
    ],
    default: Role.USER
  });

  const validateEmail = (email: string): true | string => {
    if(email === '') return true

    // Simple regex for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email) ? true : 'Syötä kelvollinen sähköpostiosoite!';
  };
  const email = await input({ message: 'Sähköposti:', validate: validateEmail });

  const firstName = await input({ message: 'Etunimi:' });
  const lastName = await input({ message: 'Sukunimi:' });

  try {
    const hashedPassword = await hash(passwordValue, saltRounds);

    await db.user.create({
      data: {
        username,
        password: hashedPassword,
        role,
        email,
        firstName,
        lastName
      }
    })
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    // Explicitly disconnect PrismaClient
    await db.$disconnect();
  }

  console.log('User created successfully!');
};

createUser().catch((error) => {
  console.error('Error creating user:', error);
});