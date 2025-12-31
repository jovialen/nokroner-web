<script setup lang="ts">
import AccountSelector from '../accounts/AccountSelector.vue'

import type { TransactionInfo } from '@/api/schemas'
import api from '@/services/axios'
import { useAccountsStore, useTransactionsStore } from '@/stores/accounts'
import { computed, ref, watch } from 'vue'

const emit = defineEmits(["submit", "created", "error"])

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
  emit("submit", transaction.value)

  try {
    const response = await api.post('/transactions', transaction.value)
    transactions.fetchAccounts()
    accounts.fetchAccounts()
    emit("created", response.data)
  } catch (err) {
    emit("error", err)
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
  <form @submit.stop.prevent="submit()" class="flex flex-col gap-4 items-center">
    <div class="flex xl:flex-row flex-col justify-between items-center gap-4">
      <AccountSelector class="order-1" :options="accounts.user_accounts" v-model="transaction.from_account_id">
        {{ $t('schema.transaction.from_account') }}
      </AccountSelector>

      <div class="grow flex flex-col gap-4 xl:order-2 order-4">
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

      <AccountSelector class="order-3" :options="accounts.accounts" v-model="transaction.to_account_id">
        {{ $t('schema.transaction.to_account') }}
      </AccountSelector>
    </div>

    <div class="flex-row!">
      <button type="submit" class="bg-primary text-primary-foreground px-2 py-1 rounded-lg" :disabled="submitting">
        {{ $t('page.create_account.submit') }}
      </button>
    </div>
  </form>
</template>

<style scoped></style>
