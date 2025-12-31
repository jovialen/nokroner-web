<script setup lang="ts">
import { useAuthStore, type RegistrationData } from '@/stores/auth'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
auth.error = ''

const formData = ref<RegistrationData>({
  first_name: '',
  last_name: '',
  email_address: '',
  password: '',
  password_confirmation: '',
})

const register = async () => {
  // Attempt registration
  if (await auth.register(formData.value)) {
    router.replace({
      path: route.query.returnUrl?.toString() ?? '/',
    })
  }
}
</script>

<template>
  <h2 class="text-xl text-center mb-4">{{ $t('auth.register') }}</h2>

  <form class="space-y-4 w-md" @submit.stop.prevent="register()">
    <p v-if="auth.error" class="text-destructive">{{ auth.error }}</p>

    <div class="grid! grid-cols-2">
      <div>
        <label for="first_name">{{ $t('auth.first_name') }}</label>
        <input
          v-model="formData.first_name"
          type="text"
          name="first_name"
          id="first_name"
          :placeholder="$t('auth.placeholder.first_name')"
        />
      </div>

      <div>
        <label for="last_name">{{ $t('auth.last_name') }}</label>
        <input
          v-model="formData.last_name"
          type="text"
          name="last_name"
          id="last_name"
          :placeholder="$t('auth.placeholder.last_name')"
        />
      </div>
    </div>

    <div>
      <label for="email_address">{{ $t('auth.email') }}</label>
      <input
        v-model="formData.email_address"
        type="email"
        name="email_address"
        id="email_address"
        :placeholder="$t('auth.placeholder.email')"
      />
    </div>

    <div>
      <label for="password">{{ $t('auth.password') }}</label>
      <input
        v-model="formData.password"
        type="password"
        name="password"
        id="password"
        :placeholder="$t('auth.placeholder.password')"
      />
    </div>

    <div>
      <label for="password_confirmation">{{
        $t('auth.password_confirmation')
      }}</label>
      <input
        v-model="formData.password_confirmation"
        type="password"
        name="password_confirmation"
        id="password_confirmation"
        :placeholder="$t('auth.placeholder.password_confirmation')"
      />
    </div>

    <div class="grid! grid-cols-2">
      <button
        type="submit"
        :disabled="auth.loading"
        class="bg-primary text-primary-foreground"
      >
        {{ $t('auth.register') }}
      </button>
      <router-link
        :to="`/login?returnUrl=${$route.query.returnUrl ?? '/'}`"
        class="bg-secondary text-secondary-foreground"
      >
        {{ $t('auth.login') }}
      </router-link>
    </div>
  </form>
</template>
<style scoped>
@reference "tailwindcss";

label {
  color: var(--muted-foreground);
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
