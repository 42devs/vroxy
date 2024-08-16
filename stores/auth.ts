import type { inferRouterOutputs } from '@trpc/server';
import { TRPCClientError } from '@trpc/client';
import type { AppRouter } from '~/server/trpc/routers';
import { userLoginForm } from '~/server/forms/auth';

type routerOutput = inferRouterOutputs<AppRouter>;
type UserOutput = routerOutput['auth']['getUser'] | null;

export default defineStore('auth', () => {
  const user = ref<UserOutput>(null);
  const loading = ref(false);

  const fieldErrors = ref<Record<string, string[]>>({});

  const { $client } = useNuxtApp();

  const login = async (username: string, password: string) => {
    try {
      loading.value = true;
      fieldErrors.value = {};
      const { result, message } = await $client.auth.login.mutate({ username, password });
      if (result === 'success') {
        showSuccessToast(message);
        await getUser();
        loading.value = false;
        navigateTo('/');
      }
    }
    catch (cause) {
      // Handles TRPCClientErrors
      if (cause instanceof TRPCClientError) {
        if (cause.data.code === 'BAD_REQUEST') {
          // Store the errors to display them in the form
          fieldErrors.value = cause.data.zodError.fieldErrors;
        }
        else {
          // Show a toast with the error message
          showErrorToast(cause.data.code);
        }
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
    fieldErrors,
    login,
    logout,
    getUser,
  };
});
