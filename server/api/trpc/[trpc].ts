import { createNuxtApiHandler } from 'trpc-nuxt';
import { appRouter } from '~/server/trpc/routers/';
import { createContext } from '~/server/trpc/context';

// Nuxt Mount Point
export default createNuxtApiHandler({
  router: appRouter,
  createContext,
});
