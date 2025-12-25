<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useRoute } from 'vue-router';

const auth = useAuthStore();
const route = useRoute();
</script>

<template>
  <router-link @click="auth.logout()" :to="`/login?returnUrl=${route.path}`">
    <slot>{{ $t("auth.logout") }}</slot>
  </router-link>
</template>

<style scoped></style>
