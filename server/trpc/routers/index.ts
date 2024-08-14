import { userRouter } from '~/server/trpc/routers/users';
import { authRouter } from '~/server/trpc/routers/auth';
import { router } from '~/server/trpc/trpc';

// Main app router
export const appRouter = router({
  user: userRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
