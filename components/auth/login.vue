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
          <div class="flex flex-col gap-2">
            <label for="username">Username</label>
            <InputText
              id="username"
              v-model="user"
              type="text"
              aria-describedby="username-help"
            />
            <template
              v-if="authStore.fieldErrors['username']"
            >
              <small
                v-for="error, index in authStore.fieldErrors['username']"
                :key="index"
              >
                {{ error }}
              </small>
            </template>
          </div>
          <div class="flex flex-col gap-2">
            <label for="password">Password</label>
            <InputText
              id="password"
              v-model="password"
              type="password"
              @keyup.enter="handleLogin"
            />
            <template
              v-if="authStore.fieldErrors['password']"
            >
              <small
                v-for="error, index in authStore.fieldErrors['password']"
                :key="index"
              >
                {{ error }}
              </small>
            </template>
          </div>
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
  catch (e) {
    // Clean the form if there is an error
    user.value = '';
    password.value = '';
  }
};
</script>
