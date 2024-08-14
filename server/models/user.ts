import { publicProcedure } from '~/server/trpc/trpc';
import { hashPassword } from '~/server/utils/hash';
import { deleteUserForm, updateUserForm, userRegistrationForm } from '~/server/forms/auth';

export const getAllUsers = publicProcedure.query(async ({ ctx }) => {
  const result = ctx.prisma.user.findMany();
  return result;
});

export const getUserCount = publicProcedure.query(async ({ ctx }) => await ctx.prisma.user.count());

export const registerUser = publicProcedure
  .input(userRegistrationForm)
  .mutation(async ({ input, ctx }) => {
    const { username, password } = input;
    const hash = await hashPassword(password);
    const createdUser = await ctx.prisma.user.create({
      data: {
        username,
        password_hash: hash,
      },
    });
    return createdUser;
  });

export const updateUser = publicProcedure
  .input(updateUserForm)
  .mutation(async ({ input, ctx }) => {
    const { data, id } = input;
    const updatedUser = await ctx.prisma.user.update({
      where: { id },
      data,
    });
    return updatedUser;
  });

export const deleteUser = publicProcedure
  .input(deleteUserForm)
  .mutation(async ({ input, ctx }) => {
    const { id } = input;
    const deletedUser = await ctx.prisma.user.delete({
      where: { id },
    });
    return deletedUser;
  });
