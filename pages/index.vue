<template>
  <div>
    <template v-if="authStore.user">
      <p>Logged as:</p>
      <pre>{{ authStore.user }}</pre>
      <Button
        v-if="authStore.user"
        label="SignOut!"
        @click.prevent="authStore.logout"
      />
    </template>
    <template v-else>
      <p>No user loaded, if you are seeing this, the middleware didn't worked</p>
    </template>
  </div>
</template>

<script setup lang="ts">
const authStore = auth();

useHead({
  title: 'Home Page',
});

definePageMeta({
  title: 'Home',
  middleware: [
    'auth',
  ],
});
</script>
