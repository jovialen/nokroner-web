<script setup lang="ts">
import { useAuthStore, type LoginData } from '@/stores/auth';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const auth = useAuthStore();

const formData = ref<LoginData>({
  email_address: "",
  password: "",
})

const login = async () => {
  // Attempt login
  if (await auth.login(formData.value)) {
    const returnUrl = route.query["returnUrl"]?.toString() ?? "/";
    window.location.href = returnUrl
  }
}
</script>

<template>
  <h1>{{ $t("auth.login") }}</h1>
  <form class="flex flex-col gap-2" @submit.stop.prevent="login()">
    <span v-if="auth.error" class="text-destructive">{{ auth.error }}</span>
    <label for="email">{{ $t("auth.email") }}</label>
    <input id="email" type="email" v-model="formData.email_address" :placeholder="$t('auth.placeholder.email')" />
    <label for="password">{{ $t("auth.password") }}</label>
    <input id="password" type="password" v-model="formData.password" :placeholder="$t('auth.placeholder.password')" />
    <button type="submit" :disabled="auth.loading">{{ $t("auth.login") }}</button>
  </form>
  <router-link :to="`/register?returnUrl=${$route.query.returnUrl}`">{{ $t("auth.register") }}</router-link>
</template>

<style scoped></style>
