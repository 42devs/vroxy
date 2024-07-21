import { z } from 'zod';

import { publicProcedure, router } from '~/server/trpc/trpc';

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
  getAllUsers: publicProcedure.query(async ({ ctx }) => await ctx.prisma.user.findMany()),
  getUserCount: publicProcedure.query(async ({ ctx }) => await ctx.prisma.user.count()),
});

export type AppRouter = typeof appRouter;
