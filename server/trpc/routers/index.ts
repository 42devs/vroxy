import { z } from 'zod';

import { publicProcedure, router } from '../trpc';

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query((ctx) => {
      return {
        message: `Hi ${ctx.input.name}`,
      };
    }),
});

export type AppRouter = typeof appRouter;
