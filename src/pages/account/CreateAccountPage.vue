<script setup lang="ts">
import { type AccountInfo } from '@/api/schemas';
import api from '@/services/axios';
import { useAccountsStore } from '@/stores/accounts';
import { useOwnersStore } from '@/stores/owners';
import axios from 'axios';
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const accounts = useAccountsStore()
const owners = useOwnersStore()

const account = ref<AccountInfo>({
  name: '',
  account_number: '',
  balance: 0,
  interest: 0,
  owner_id: 0
})
const submitting = ref(false)

const submit = async () => {
  submitting.value = true

  try {
    await api.post("/accounts", account.value)
    accounts.fetchAccounts()
    router.back()
  } catch (err) {
    if (axios.isAxiosError(err)) {
      alert(err.response?.data?.error || err.message)
    } else {
      alert("Failed to create account")
    }
  } finally {
    submitting.value = false
  }
}

watchEffect(() => {
  if (owners.user_owner) {
    account.value.owner_id = owners.user_owner.id
  }
})
</script>

<template>
  <form @submit.stop.prevent="submit()" class="flex flex-col gap-4">
    <div>
      <label for="name">{{ $t("schema.account.name") }}</label>
      <input type="text" name="name" id="name" v-model="account.name"
        :placeholder="$t('page.create_account.placeholder.name')">
    </div>

    <div>
      <label for="name">{{ $t("schema.account.account_number") }}</label>
      <input type="text" name="account_number" id="account_number" v-model="account.account_number"
        :placeholder="$t('page.create_account.placeholder.account_number')">
    </div>

    <div>
      <label for="initial_balance">{{ $t("schema.account.balance") }}</label>
      <input type="number" step="0.01" name="initial_balance" id="initial_balance" v-model="account.balance">
    </div>

    <div>
      <label for="interest">{{ $t("schema.account.interest") }}</label>
      <input type="number" step="0.001" name="interest" id="interest" v-model="account.interest">
    </div>

    <div class="flex-row!">
      <button type="submit" class="bg-primary text-primary-foreground px-2 py-1" :disabled="submitting">
        {{ $t("page.create_account.submit") }}
      </button>
    </div>
  </form>
</template>

<style scoped>
@reference "tailwindcss";

label {
  @apply text-sm;
  color: var(--muted-foreground);
}

input {
  @apply px-4 py-2;
  background-color: var(--muted);
}

div {
  @apply flex flex-col gap-2;
}
</style>
