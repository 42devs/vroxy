import * as UserModel from '~/server/models/user';
import { router } from '~/server/trpc/trpc';

export const userRouter = router({
  ...UserModel,
});
