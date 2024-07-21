import { z } from 'zod';
import argon2 from 'argon2';
import { publicProcedure, router } from '~/server/trpc/trpc';

const secret = Buffer.from(process.env.MAIN_SECRET || 'localSecret');

export const userRouter = router({
  getUserCount: publicProcedure.query(async ({ ctx }) => await ctx.prisma.user.count()),
  registerUser: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { username, password } = input;
      const hash = await argon2.hash(password, { secret });
      const createdUser = await ctx.prisma.user.create({
        data: {
          username,
          password: hash,
        },
      });
      return createdUser;
    }),
});
