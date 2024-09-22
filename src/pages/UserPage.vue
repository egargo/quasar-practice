<template>
  <q-page class="column">
    <h1>Logged In</h1>
    <q-btn unelevated color="primary" label="Logout" @click="logout" />
  </q-page>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
}
</script>
