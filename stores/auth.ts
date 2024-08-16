import type { inferRouterOutputs } from '@trpc/server';
import { TRPCClientError } from '@trpc/client';
import type { AppRouter } from '~/server/trpc/routers';

type routerOutput = inferRouterOutputs<AppRouter>;
type UserOutput = routerOutput['auth']['getUser'] | null;

export default defineStore('auth', () => {
  const user = ref<UserOutput>(null);
  const loading = ref(false);

  const { $client } = useNuxtApp();

  const login = async (username: string, password: string) => {
    try {
      loading.value = true;
      const { result, message } = await $client.auth.login.mutate({ username, password });
      if (result === 'success') {
        showSuccessToast(message);
        await getUser();
        loading.value = false;
        navigateTo('/');
      }
    }
    catch (cause) {
      if (cause instanceof TRPCClientError) {
        showErrorToast(cause.message);
      }
      loading.value = false;
      throw cause;
    }
  };

  const getUser = async () => {
    try {
      loading.value = true;
      const result = await $client.auth.getUser.query();
      user.value = result;
    }
    catch (cause) {
      user.value = null;
    }
    finally {
      loading.value = false;
    }
    return user.value;
  };

  // const signIn = async (email: string, password: string) => {
  //   await $client.auth.signIn.mutate({ email, password });
  //   await getUser();
  // }

  const logout = async () => {
    const { message } = await $client.auth.logout.mutate();
    showSuccessToast(message);
    user.value = null;
    navigateTo('/login');
  };

  return {
    user,
    loading,
    login,
    logout,
    getUser,
  };
});
