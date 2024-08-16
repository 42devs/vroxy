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
            @keyup.enter="handleLogin"
          />
          <Button
            label="Login"
            :loading="authStore.loading"
            @click.prevent="handleLogin"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
const authStore = auth();

const user = ref('');
const password = ref('');

const handleLogin = async () => {
  try {
    await authStore.login(user.value, password.value);
  }
  catch {
    user.value = '';
    password.value = '';
  }
};
</script>
