// TRPC Init
import { initTRPC, TRPCError } from '@trpc/server';
import type { Context } from '~/server/trpc/context';

const t = initTRPC.context<Context>().create();

export const publicProcedure = t.procedure;

// Checks for Signed In User
export const signedInProcedure = publicProcedure.use(async (opts) => {
  const { ctx } = opts;
  if (!ctx.event.context.user || !ctx.event.context.session) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' });
  }
  return opts.next();
});

export const router = t.router;
export const mergeRouters = t.mergeRouters;
export const middleware = t.middleware;
