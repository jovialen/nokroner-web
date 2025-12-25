<script setup lang="ts">
import { useAuthStore, type LoginData } from '@/stores/auth'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
auth.error = "";

const formData = ref<LoginData>({
  email_address: '',
  password: '',
})


const login = async () => {
  // Attempt login
  if (await auth.login(formData.value)) {
    router.replace({
      path: route.query.returnUrl?.toString() ?? '/',
    })
  }
}
</script>

<template>
  <h2 class="text-xl text-center mb-4">{{ $t("auth.login_greeting") }}</h2>

  <form class="space-y-4 w-xs" @submit.stop.prevent="login()">
    <p v-if="auth.error" class="text-destructive">{{ auth.error }}</p>

    <div>
      <label for="email">{{ $t('auth.email') }}</label>
      <input id="email" type="email" v-model="formData.email_address" :placeholder="$t('auth.placeholder.email')" />
    </div>

    <div>
      <label for="password">{{ $t('auth.password') }}</label>
      <input id="password" type="password" v-model="formData.password" :placeholder="$t('auth.placeholder.password')" />
    </div>

    <div class="grid! grid-cols-2">
      <button type="submit" :disabled="auth.loading" class="bg-primary text-primary-foreground">
        {{ $t('auth.login') }}
      </button>
      <router-link :to="`/register?returnUrl=${$route.query.returnUrl}`" class="bg-secondary text-secondary-foreground">
        {{ $t('auth.register') }}
      </router-link>
    </div>
  </form>
</template>

<style scoped>
@reference "tailwindcss";

label {
  @apply text-muted-foreground;
}

input {
  @apply px-4 py-2;
  background-color: var(--muted);
}

div {
  @apply flex flex-col gap-2;
}

a,
button {
  @apply px-4 py-2 text-center;
  cursor: pointer;
}
</style>
