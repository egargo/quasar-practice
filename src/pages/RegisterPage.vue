<template>
  <q-page class="column">
    <q-input type="text" v-model="username" label="Username" />
    <q-input type="password" v-model="password" label="Password" />
    <q-btn unelevated color="primary" label="Login" @click="login" />
  </q-page>
</template>


<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();
const username: Ref<string, string> = ref('');
const password: Ref<string, string> = ref('');

const login = async () => {
  await authStore.login(username.value, password.value);
}
</script>
