import type { inferAsyncReturnType } from '@trpc/server';
import type { H3Event } from 'h3';
import type { Session, User } from 'lucia';
import { prisma } from '~/server/prisma';
import { lucia } from '~/server/utils/auth';

export const createContext = async (event: H3Event) => {
  // Creates the user context for TRPC
  const sessionId = getCookie(event, lucia.sessionCookieName) ?? null;

  // If there is no session, set the user to null
  if (sessionId) {
    const { session, user } = await lucia.validateSession(sessionId);
    if (session && session.fresh) {
      appendResponseHeader(
        event,
        'Set-Cookie',
        lucia.createSessionCookie(session.id).serialize(),
      );
    }
    if (!session) {
      appendResponseHeader(event, 'Set-Cookie', lucia.createBlankSessionCookie().serialize());
    }
    event.context.session = session;
    event.context.user = user;
  }
  else {
    event.context.session = null;
    event.context.user = null;
  }

  return {
    event,
    prisma,
    lucia,
  };
};

declare module 'h3' {
  interface H3EventContext {
    user: User | null;
    session: Session | null;
  }
}

export type Context = inferAsyncReturnType<typeof createContext>;
