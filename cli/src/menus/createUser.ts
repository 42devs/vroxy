import { input, password as passwordPrompt } from '@inquirer/prompts';
import { createUser as createUserModel } from '../../../server/models/user_old.js';

export const createUser = async () => {
  const answers = {
    username: await input({
      message: 'username?',
      required: true,
      validate: value => value.length <= 3 ? 'should be longer than three' : true,
    }),
    password: await passwordPrompt({
      message: 'password?',
      validate: value => value.length <= 6 ? 'should be longer than six' : true,
    }),

  };
  const { username, password } = answers;
  const result = await createUserModel(username, password);
  return result;
};
