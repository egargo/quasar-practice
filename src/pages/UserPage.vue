<template>
  <q-page class="column">
    <q-table
      title="Users"
      row-keys="id"
      :rows="userStore.getUsers"
    >
    </q-table>

    <q-btn name="logout" unelevated color="primary" label="Logout" @click="logout" />
  </q-page>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useUsersStore } from '../stores/usersStore';

const authStore = useAuthStore();
const userStore = useUsersStore();

watchEffect(() => {
  userStore.getAll();
});

const logout = () => {
  authStore.logout();
}
</script>
