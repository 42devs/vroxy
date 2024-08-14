<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center">
    <Card>
      <template #title>
        <div class="flex justify-center py-3">
          <h1>Login</h1>
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
            label="Login"
            @click="loginUser"
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

const loginUser = async () => {
  try {
    await $client.auth.login.mutate({ username: user.value, password: password.value });
    error.value = null;
  }
  catch (e) {
    error.value = e;
    result.value = null;
  }
};
</script>
