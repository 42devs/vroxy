import { select, Separator } from '@inquirer/prompts';
import { getUserCount } from '../../../server/models/user_old.js';
import { manageUsers } from './manageUsers.js';
import { createUser } from './createUser.js';

export const mainMenu = async (session: string = null) => {
  const userCount = await getUserCount();
  const option = await select({
    message: 'Select an option',
    choices: [
      {
        name: `Manage Users (${userCount})`,
        value: 'manage',
        description: 'Manage Users',
        disabled: userCount === 0,
      },
      {
        name: 'create',
        value: 'create',
        description: `Create${userCount === 0 ? ' First ' : ' '}User`,
      },
      {
        name: 'Log In',
        value: 'login',
        description: 'Test login User',
        disabled: session ? false : true,
      },
      new Separator(),
      {
        name: 'exit',
        value: 'exit',
        description: 'Close the CLI',
      },
    ],
  });

  switch (option) {
    case 'manage':
      await manageUsers();
      break;
    case 'create':
      const { id } = await createUser();
      if (id) {
        session = id;
      }
      break;
    case 'login':
      console.log('Should go to login user');
      break;
    case 'exit':
      process.exit(0);
  };

  await mainMenu(session);
};
