<script setup lang="ts">
import { useAuthStore, type LoginData } from '@/stores/auth';
import { ref } from 'vue';

  const auth = useAuthStore();

  const formData = ref<LoginData>({
    email_address: "",
    password: "",
  })

  const login = (e: Event) => {
    // Prevent redirect
    e.preventDefault();

    // Attempt login
    auth.login(formData.value)
  }
</script>

<template>
  <h1>Login</h1>
  <form class="flex flex-col gap-2" @submit="login">
    <span v-if="auth.error" class="text-destructive">{{ auth.error }}</span>
    <label for="email">Epost</label>
    <input id="email" type="email" v-model="formData.email_address" placeholder="max@manus.no" />
    <label for="password">Passord</label>
    <input id="password" type="password" v-model="formData.password" placeholder="Passord..." />
    <button type="submit" :disabled="auth.loading">Log in</button>
  </form>
  <router-link :to="`/register?returnUrl=${$route.query.returnUrl}`">New user</router-link>
</template>

<style scoped></style>
