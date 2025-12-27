<script setup lang="ts">
import { type TransactionInfo } from '@/api/schemas'
import BackButton from '@/components/button/BackButton.vue'
import api from '@/services/axios'
import { useAccountsStore } from '@/stores/accounts'
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const accounts = useAccountsStore()

const transaction = ref<TransactionInfo>({
  name: '',
  amount: 0,
  from_account_id: accounts.user_accounts[0]?.id ?? 0,
  to_account_id: accounts.user_accounts[0]?.id ?? 0,
})
const submitting = ref(false)

const submit = async () => {
  submitting.value = true

  try {
    await api.post('/transactions', transaction.value)
    accounts.fetchAccounts()
    router.back()
  } catch (err) {
    if (axios.isAxiosError(err)) {
      alert(err.response?.data?.error || err.message)
    } else {
      alert('Failed to create transaction')
    }
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="flex items-center gap-4">
    <BackButton />
    <h1 class="text-xl">{{ $t('page.create_transaction.title') }}</h1>
  </div>

  <form @submit.stop.prevent="submit()" class="flex flex-col gap-4">
    <div>
      <label for="name">{{ $t('schema.transaction.name') }}</label>
      <input type="text" name="name" id="name" v-model="transaction.name"
        :placeholder="$t('page.create_transaction.placeholder.name')" />
    </div>

    <div>
      <label for="amount">{{ $t('schema.transaction.amount') }}</label>
      <input type="number" step="0.01" name="amount" id="amount" v-model="transaction.amount" />
    </div>

    <div>
      <label for="from_account">{{ $t('schema.transaction.from_account') }}</label>
      <select name="from_account" id="from_account" v-model="transaction.from_account_id">
        <option v-for="account in accounts.user_accounts" :value="account.id" :key="account.name">
          {{ account.name }}
        </option>
      </select>
    </div>

    <div>
      <label for="to_account">{{ $t('schema.transaction.to_account') }}</label>
      <select name="to_account" id="to_account" v-model="transaction.to_account_id">
        <option v-for="account in accounts.accounts" :value="account.id" :key="account.name">
          {{ account.name }}
        </option>
      </select>
    </div>

    <div class="flex-row!">
      <button type="submit" class="bg-primary text-primary-foreground px-2 py-1" :disabled="submitting">
        {{ $t('page.create_account.submit') }}
      </button>
    </div>
  </form>
</template>

<style scoped>
@reference "tailwindcss";

form>label {
  @apply text-sm;
  color: var(--muted-foreground);
}

form>input {
  @apply px-4 py-2;
  background-color: var(--muted);
}

form>div {
  @apply flex flex-col gap-2;
}
</style>
