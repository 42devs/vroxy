import { TRPCError } from '@trpc/server';
import { publicProcedure, signedInProcedure } from '~/server/trpc/trpc';
import { verifyPassword } from '~/server/utils/hash';
import { userLoginForm } from '~/server/forms/auth';

export const login = publicProcedure
  .input(userLoginForm)
  .mutation(async ({ input, ctx }) => {
    const { username, password } = input;
    const user = await ctx.prisma.user.findUnique({
      select: {
        id: true,
        password_hash: true,
      },
      where: { username },
    });
    if (!user) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not logged in' });
    }
    const valid = await verifyPassword(user.password_hash, password);
    if (!valid) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not logged in' });
    }
    const session = await ctx.lucia.createSession(user.id, {});
    appendHeader(ctx.event, 'Set-Cookie', ctx.lucia.createSessionCookie(session.id).serialize());
    return {
      result: 'success',
      redirect: '/',
    };
  });

export const logout = signedInProcedure
  .mutation(async ({ ctx }) => {
    if (!ctx.event.context.session) {
      throw new TRPCError({ code: 'FORBIDDEN', message: 'Not logged in' });
    }
    await ctx.lucia.invalidateSession(ctx.event.context.session.id);
    appendHeader(ctx.event, 'Set-Cookie', ctx.lucia.createBlankSessionCookie().serialize());
    return {
      result: 'success',
      redirect: '/login',
    };
  });

export const getUser = signedInProcedure.query(async ({ ctx }) => {
  return ctx.event.context.user;
});

// export const getAllUserSessions = signedInProcedure.query(async ({ ctx }) => {
//   const sessions = await ctx.lucia.getUserSessions(ctx.event.context.session.userId);
//   return sessions;
// });
