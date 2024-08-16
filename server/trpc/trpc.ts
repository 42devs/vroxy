// TRPC Init
import { initTRPC, TRPCError } from '@trpc/server';
import { ZodError } from 'zod';
import type { Context } from '~/server/trpc/context';

const t = initTRPC.context<Context>().create({
  // Formats zod errors to be returned in the error response
  errorFormatter: (opts) => {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
});

// TRPC Procedure: Public procedure that allows all requests
export const publicProcedure = t.procedure;

// TRPC Procedure: Rejects all requests that are not signed in
export const signedInProcedure = publicProcedure.use(async (opts) => {
  // Checks if the user is signed in and has a session from the context
  const { ctx } = opts;
  if (!ctx.event.context.user || !ctx.event.context.session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Unauthorized',
    });
  }
  return opts.next();
});

export const router = t.router;
export const mergeRouters = t.mergeRouters;
export const middleware = t.middleware;
