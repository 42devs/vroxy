<template>
  <div class="bg-gray-900 w-screen h-screen flex flex-col items-left">
    <div class="font-medium text-3xl text-900 mb-3">
      User List
    </div>
    <ConfirmDialog />
    <DataTable
      v-model:editingRows="editingRows"
      :loading="!userList"
      :value="userList"
      data-key="id"
      edit-mode="row"
      @row-edit-save="onRowEditSave"
    >
      <Column
        v-for="col of userColumns"
        :key="col"
        :field="col"
        :header="col"
      >
        <template
          v-if="editableFields.includes(col)"
          #editor="{ data, field }"
        >
          <InputText
            v-model="data[field]"
            fluid
          />
        </template>
      </Column>
      <Column
        :row-editor="true"
        style="width: 10%; min-width: 8rem"
        body-style="text-align:center"
      />
      <Column>
        <template #body="slotProps">
          <Button
            severity="danger"
            icon="pi pi-trash"
            @click="confirmDelete(slotProps.data.id)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import type { DataTableRowEditSaveEvent } from 'primevue/datatable';

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

const editableFields = ['username'];

const editingRows = ref([]);

const confirm = useConfirm();
const toast = useToast();

const onRowEditSave = async (payload: DataTableRowEditSaveEvent) => {
  const { newData, index } = payload;

  const updatedUser = await $client.user.updateUser.mutate({ id: newData.id, data: newData });

  const newUserList = userList.value?.map((value, rowIndex) => {
    if (rowIndex === index) {
      return updatedUser;
    }
    return value;
  }) || [];

  userList.value = newUserList;
};

const confirmDelete = (id: string) => {
  confirm.require({
    message: 'Are you sure you want to delete this User?',
    header: 'Danger Zone',
    icon: 'pi pi-info-circle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger',
    },
    accept: async () => {
      try {
        await $client.user.deleteUser.mutate({ id });
        userList.value = userList.value?.filter(user => user.id !== id) || [];
        toast.add({ severity: 'info', summary: 'Confirmed', detail: 'User Deleted', life: 3000 });
      }
      catch (e) {
        console.log('Error deleting user', e);
        toast.add({ severity: 'warn', summary: 'Error', detail: 'Error Deleting User', life: 3000 });
      }
    },
    reject: () => {
      toast.add({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    },
  });
};
</script>
