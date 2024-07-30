import { z } from 'zod';
import argon2 from 'argon2';
import { publicProcedure } from '~/server/trpc/trpc';

// Internal use variables
const _secret = Buffer.from(process.env.MAIN_SECRET || 'localSecret');

// User models to be imported on TRPC routes

export const getAllUsers = publicProcedure.query(async ({ ctx }) => {
  const result = ctx.prisma.user.findMany();
  return result;
});

export const getUserCount = publicProcedure.query(async ({ ctx }) => await ctx.prisma.user.count());

export const registerUser = publicProcedure
  .input(
    z.object({
      username: z.string()
        .min(3)
        .max(32),
      password: z.string()
        .min(6),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { username, password } = input;
    const hash = await argon2.hash(password, { secret: _secret });
    const createdUser = await ctx.prisma.user.create({
      data: {
        username,
        password: hash,
      },
    });
    return createdUser;
  });

export const updateUser = publicProcedure
  .input(
    z.object({
      data: z.object({
        username: z.string()
          .min(3)
          .max(32)
          .optional(),
      }),
      id: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { data, id } = input;
    const updatedUser = await ctx.prisma.user.update({
      where: { id },
      data,
    });
    return updatedUser;
  });

export const deleteUser = publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { id } = input;
    const deletedUser = await ctx.prisma.user.delete({
      where: { id },
    });
    return deletedUser;
  });
