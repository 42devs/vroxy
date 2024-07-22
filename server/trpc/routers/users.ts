import { getAllUsers, getUserCount, registerUser } from '~/server/models/user';
import { router } from '~/server/trpc/trpc';

export const userRouter = router({
  getUserCount,
  getAllUsers,
  registerUser,
});
