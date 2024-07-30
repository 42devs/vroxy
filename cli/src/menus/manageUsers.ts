// Manage users script
import { select, Separator } from '@inquirer/prompts';
import { getAllUsersByPage } from '../../../server/models/user_old.js';

export const manageUsers = async () => {
  const userList = await getAllUsersByPage();
  const userOptions = userList.result.map((user) => {
    return {
      name: user.username,
      value: user.id,
    };
  });
  const option = await select({
    message: `Page (${userList.page}) / Select an option`,
    choices: [
      ...userOptions,
      new Separator(),
      {
        name: 'Previous',
        value: 'prev',
        disabled: userList.previous ? false : true,
      },
      {
        name: 'Next',
        value: 'next',
        disabled: userList.next ? false : true,
      },
      {
        name: 'Exit',
        value: 'exit',
      },
    ],
  });

  const userIds = userList.result.map(user => user.id);

  switch (true) {
    case userIds.includes(option):
      console.log(`Modify ${option}`);
      break;
    case option === 'prev':
      console.log('Should go to previous page');
      break;
    case option === 'next':
      console.log('Should go to next page');
    case option === 'exit':
      return;
  };
  await manageUsers();
};
