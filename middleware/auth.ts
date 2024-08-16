export default defineNuxtRouteMiddleware(async (to, _from) => {
  const authStore = auth();
  // tries to get the user from the store
  const user = await authStore.getUser();
  if (!user) {
    // if the user is not found, redirect to the login page
    return navigateTo({
      path: '/login',
      query: {
        redirect: to.path,
      },
    });
  }
});
