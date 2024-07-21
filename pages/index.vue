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

const text = ref('hugo');

const result = ref<unknown>({});

const updateResult = async () => {
  const queryResult = await $client.hello.query({ name: text.value });
  result.value = queryResult;
};
</script>
