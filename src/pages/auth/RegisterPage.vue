<script setup lang="ts">
import { useAuthStore, type RegistrationData } from '@/stores/auth';
import { ref } from 'vue';

  const auth = useAuthStore();

  const formData = ref<RegistrationData>({
    first_name: "",
    last_name: "",
    email_address: "",
    password: "",
    password_confirmation: "",
  })

  const register = (e: Event) => {
    // Prevent redirect
    e.preventDefault();

    // Attempt registration
    auth.register(formData.value)
  }
</script>

<template>
  <form @submit="register" class="flex flex-col gap-2">
    <span v-if="auth.error">{{ auth.error }}</span>

    <div class="flex gap-2">
      <input v-model="formData.first_name" type="text" name="first_name" id="first_name" placeholder="Max">
      <input v-model="formData.last_name" type="text" name="last_name" id="last_name" placeholder="Manus">
    </div>

    <input v-model="formData.email_address" type="email" name="email_address" id="email_address" placeholder="max@manus.no">

    <input v-model="formData.password" type="password" name="password" id="password" placeholder="Passord...">
    <input v-model="formData.password_confirmation" type="password" name="password_confirmation" id="password_confirmation" placeholder="Passord igjen...">

    <button type="submit" :disabled="auth.loading">Registrer</button>
  </form>
  <router-link :to="`/login?returnUrl=${$route.query.returnUrl}`">Login</router-link>
</template>

<style scoped></style>
