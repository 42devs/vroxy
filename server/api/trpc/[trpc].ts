import { createNuxtApiHandler } from 'trpc-nuxt';
import { appRouter } from '~/server/trpc/routers/';
import { createContext } from '~/server/trpc/context';

// Nuxt Mount Point
export default createNuxtApiHandler({
  router: appRouter,
  createContext,
  onError: (opts) => {
    const { error, path } = opts;
    // Logs internal server errors
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      console.error('Internal server error', error, path);
    }
  },
});
