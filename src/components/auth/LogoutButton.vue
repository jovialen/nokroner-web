<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuthStore()

const logout = async () => {
  await auth.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <button @click="logout()">
    <slot>{{ $t('auth.logout') }}</slot>
  </button>
</template>

<style scoped></style>
