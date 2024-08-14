import { appendHeader } from 'h3';
import { publicProcedure } from '~/server/trpc/trpc';
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
      throw new Error('Auth Failed');
    }
    const valid = await verifyPassword(user.password_hash, password);
    if (!valid) {
      throw new Error('Auth Failed');
    }
    const session = await ctx.lucia.createSession(user.id, {});
    appendHeader(ctx.event, 'Set-Cookie', ctx.lucia.createSessionCookie(session.id).serialize());
    // await sendRedirect(ctx.event, '/admin/users');
  });
