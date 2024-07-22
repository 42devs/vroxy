<template>
  <div class="bg-gray-900 w-screen h-screen flex flex-col justify-center items-center">
    <Card>
      <template #title>
        <div class="flex justify-center py-3">
          <h1>Registration</h1>
        </div>
      </template>
      <template #content>
        <div class="flex flex-col space-y-6">
          <InputText
            v-model="user"
            placeholder="Username"
            type="text"
          />
          <InputText
            v-model="password"
            placeholder="Password"
            type="password"
          />
          <Button
            label="Register"
            @click="registerUser"
          />
        </div>
      </template>
    </Card>
    <template v-if="error">
      <pre>{{ error }}</pre>
    </template>
    <template v-if="result">
      <pre>{{ result }}</pre>
    </template>
  </div>
</template>

<script setup lang="ts">
const { $client } = useNuxtApp();

const user = ref('');
const password = ref('');

const result = ref<unknown>(null);

const error = ref<unknown>(null);

const registerUser = async () => {
  try {
    const userRegistered = await $client.user.registerUser.mutate({ username: user.value, password: password.value });
    result.value = userRegistered;
    error.value = null;
  }
  catch (e) {
    error.value = e;
    result.value = null;
  }
};
</script>
