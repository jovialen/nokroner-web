<script setup lang="ts">
import { useAuthStore, type RegistrationData } from '@/stores/auth';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const auth = useAuthStore();

const formData = ref<RegistrationData>({
  first_name: "",
  last_name: "",
  email_address: "",
  password: "",
  password_confirmation: "",
})

const register = async () => {
  // Attempt registration
  if (await auth.register(formData.value)) {
    const returnUrl = route.query["returnUrl"]?.toString() ?? "/";
    window.location.href = returnUrl
  }
}
</script>

<template>
  <h1>{{ $t("auth.register") }}</h1>
  <form @submit.stop.prevent="register()" class="flex flex-col gap-2">
    <span v-if="auth.error">{{ auth.error }}</span>

    <div class="flex gap-2">
      <label for="first_name">{{ $t("auth.first_name") }}</label>
      <input v-model="formData.first_name" type="text" name="first_name" id="first_name"
        :placeholder="$t('auth.placeholder.first_name')">
      <label for="last_name">{{ $t("auth.last_name") }}</label>
      <input v-model="formData.last_name" type="text" name="last_name" id="last_name"
        :placeholder="$t('auth.placeholder.last_name')">
    </div>

    <label for="email_address">{{ $t("auth.email") }}</label>
    <input v-model="formData.email_address" type="email" name="email_address" id="email_address"
      :placeholder="$t('auth.placeholder.email')">

    <label for="password">{{ $t("auth.password") }}</label>
    <input v-model="formData.password" type="password" name="password" id="password"
      :placeholder="$t('auth.placeholder.password')">
    <label for="password_confirmation">{{ $t("auth.password_confirmation") }}</label>
    <input v-model="formData.password_confirmation" type="password" name="password_confirmation"
      id="password_confirmation" :placeholder="$t('auth.placeholder.password_confirmation')">

    <button type="submit" :disabled="auth.loading">{{ $t("auth.register") }}</button>
  </form>
  <router-link :to="`/login?returnUrl=${$route.query.returnUrl}`">{{ $t("auth.login") }}</router-link>
</template>

<style scoped></style>
