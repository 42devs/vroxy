<template>
  <div>
    <Button
      label="Click Me!"
      @click="updateResult"
    />
    <pre>{{ result }}</pre>
  </div>
</template>

<script setup lang="ts">
const { $client } = useNuxtApp();

const result = ref<unknown>({});

const updateResult = async () => {
  const queryResult = await $client.getAllUsers.query();
  result.value = queryResult;
};
</script>
