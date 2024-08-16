<template>
  <Auth-Login />
</template>

<script setup lang="ts">
useHead({
  title: 'Login Page',
});

definePageMeta({
  title: 'Login',
  middleware: [
    'unauthenticated',
  ],
});
</script>
