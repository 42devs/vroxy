import type { inferAsyncReturnType } from '@trpc/server';
import type { H3Event } from 'h3';
import type { Session, User } from 'lucia';
import { prisma } from '~/server/prisma';
import { lucia } from '~/server/utils/auth';

// Creates the basic user context for TRPC
export const createContext = async (event: H3Event) => {
  // Checks for a session cookie
  const sessionId = getCookie(event, lucia.sessionCookieName) ?? null;

  // Validates the session
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
  // No session found, set user and session to null
  else {
    event.context.session = null;
    event.context.user = null;
  }

  // Returns the basic TRPC context for use in procedures as `ctx`
  return {
    // Nuxt H3 Event
    event,
    // Prisma Client
    prisma,
    // Lucia Auth Utils
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
