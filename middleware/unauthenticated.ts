export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = auth();
  const user = await authStore.getUser();
  if (user) {
    const path = typeof from.query.redirect === 'string' ? from.query.redirect : '/';
    return navigateTo({
      path,
    });
  }
});
