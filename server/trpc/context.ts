import type { inferAsyncReturnType } from '@trpc/server';
import { prisma } from '~/server/prisma';

export const createContext = () => {
  return {
    prisma,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
