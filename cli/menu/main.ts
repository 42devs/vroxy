import { select, Separator } from '@inquirer/prompts';
import { manageUsers } from './options/manageUsers.js';
import { checkFirstUserFilled } from '../../server/models/user.js';

export const mainMenu = async (session: string = null) => {
  const userFilled = await checkFirstUserFilled();
  const option = await select({
    message: 'Select an option',
    choices: [
      {
        name: 'manage',
        value: 'manage',
        description: 'Manage Users',
        disabled: userFilled ? false : true,
      },
      {
        name: 'create',
        value: 'create',
        description: `Create${ userFilled ? ' First ' : ' ' }User`,
      },
      {
        name: 'login',
        value: 'login',
        description: 'Test login User',
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
      console.log('Should go to create User');
      break;
    case 'login':
      console.log('Should go to login user');
      break;
    case 'exit':
      console.log('Exit');
      process.exit(0);
    default:
      return;
  };
  
  await mainMenu();
};
