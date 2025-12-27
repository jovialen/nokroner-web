<script setup lang="ts">
import { type TransactionInfo } from '@/api/schemas'
import BackButton from '@/components/button/BackButton.vue'
import api from '@/services/axios'
import { useAccountsStore, useTransactionsStore } from '@/stores/accounts'
import axios from 'axios'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import AccountSelector from './components/AccountSelector.vue'

const router = useRouter()
const accounts = useAccountsStore()
const transactions = useTransactionsStore()

const transaction = ref<TransactionInfo>({
  name: '',
  amount: 0,
  from_account_id: accounts.user_accounts[0]?.id ?? -1,
  to_account_id: accounts.user_accounts[0]?.id ?? -1,
})
const submitting = ref(false)
const maxAmount = computed(() => accounts.getAccount(transaction.value.from_account_id)?.balance ?? 0)

const submit = async () => {
  submitting.value = true

  try {
    await api.post('/transactions', transaction.value)
    transactions.fetchAccounts()
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

watch([() => transaction.value.amount, maxAmount], () => {
  if (transaction.value.amount < 0) {
    transaction.value.amount = 0
  } else if (transaction.value.amount > maxAmount.value) {
    transaction.value.amount = maxAmount.value
  }
})
</script>

<template>
  <div class="flex items-center gap-4">
    <BackButton />
    <h1 class="text-xl">{{ $t('page.create_transaction.title') }}</h1>
  </div>

  <form @submit.stop.prevent="submit()" class="flex flex-col gap-4 items-center">
    <div class="flex xl:flex-row flex-col justify-between items-center gap-4">
      <AccountSelector :options="accounts.user_accounts" v-model="transaction.from_account_id" />

      <div class="grow flex flex-col gap-4">
        <input type="text" name="name" id="name" v-model="transaction.name"
          class="text-xl bg-muted text-muted-foreground px-4 py-2 rounded-lg"
          :placeholder="$t('page.create_transaction.placeholder.name')" />

        <input type="range" name="amount_range" id="amount_range" min="0" :max="maxAmount" step="0.01"
          v-model="transaction.amount"
          :disabled="transaction.from_account_id === transaction.to_account_id || transaction.from_account_id === -1">

        <div class="flex bg-muted text-muted-foreground rounded-lg px-4 py-2 gap-4 border border-border">
          <label for="amount">{{ $t('schema.transaction.amount') }}</label>
          <input type="number" name="amount" id="amount" v-model="transaction.amount" min="0" :max="maxAmount"
            step="0.01" class="w-full"
            :disabled="transaction.from_account_id === transaction.to_account_id || transaction.from_account_id === -1" />
        </div>
      </div>

      <AccountSelector :options="accounts.accounts" v-model="transaction.to_account_id" />
    </div>

    <div class="flex-row!">
      <button type="submit" class="bg-primary text-primary-foreground px-2 py-1 rounded-lg" :disabled="submitting">
        {{ $t('page.create_account.submit') }}
      </button>
    </div>
  </form>
</template>

<style scoped></style>
