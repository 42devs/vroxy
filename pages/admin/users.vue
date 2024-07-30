<template>
  <div class="bg-gray-900 w-screen h-screen flex flex-col items-left">
    <div class="font-medium text-3xl text-900 mb-3">
      User List
    </div>
    <ConfirmDialog />
    <DataTable
      :loading="!userList"
      :value="userList"
    >
      <Column
        v-for="col of userColumns"
        :key="col"
        :field="col"
        :header="col"
      />
      <Column>
        <template #body>
          <Button label="Edit" />
        </template>
      </Column>
      <Column>
        <template #body="slotProps">
          <Button
            label="Delete"
            severity="danger"
            @click="confirm1(slotProps.data.id)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
const { $client } = useNuxtApp();

const userList = computedAsync(
  async () => await $client.user.getAllUsers.query(),
  null,
);

const userColumns = computed(() => {
  if (userList.value) {
    return Object.keys(userList.value[0]);
  }
  return [];
});

const confirm = useConfirm();
const toast = useToast();

const confirm1 = (id: string) => {
  confirm.require({
    message: 'Are you sure you want to delete this User?',
    header: 'Danger Zone',
    icon: 'pi pi-info-circle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
    },
    acceptProps: {
      label: 'Save',
    },
    accept: async () => {
      try {
        $client.user.deleteUser.mutate({ id });
        userList.value = userList.value?.filter(user => user.id !== id) || [];
        toast.add({ severity: 'info', summary: 'Confirmed', detail: 'User Deleted', life: 3000 });
      } catch (e) {
        console.log('Error deleting user', e);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error Deleting User', life: 3000 });
      }
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    },
  });
};
</script>
