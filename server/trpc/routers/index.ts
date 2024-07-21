import { userRouter } from '~/server/trpc/routers/users';
import { router } from '~/server/trpc/trpc';

// Main app router
export const appRouter = router({
  user: userRouter,
});

export type AppRouter = typeof appRouter;
