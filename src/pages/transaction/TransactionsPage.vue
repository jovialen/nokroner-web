<script setup lang="ts">
import { FilterIcon, PlusIcon } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

import { useAccountsStore, useTransactionsStore } from '@/stores/accounts'
import { Table } from '@/components/table'
import { transactionColumns } from './columns'
import { computed, ref } from 'vue'

const transactions = useTransactionsStore()
const accounts = useAccountsStore()

const nameFilter = ref("")
const amountFunction = ref<"greater than" | "less than">("greater than")
const amountFilter = ref(0)
const fromFilter = ref<number | undefined>()
const toFilter = ref<number | undefined>()

const filteredTransactions = computed(() => transactions.userTransactions
  .filter(t => t.name.toLowerCase().includes(nameFilter.value.toLowerCase()))
  .filter(t => amountFunction.value === "greater than" ? t.amount >= amountFilter.value : t.amount <= amountFilter.value)
  .filter(t => fromFilter.value ? t.from_account_id === fromFilter.value : true)
  .filter(t => toFilter.value ? t.to_account_id === toFilter.value : true)
)
</script>

<template>
  <div class="flex justify-between items-center">
    <h1 class="text-xl">{{ $t('navigation.transactions') }}</h1>

    <router-link to="/transaction/create"
      class="flex items-center bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4 py-2 transition">
      <PlusIcon />
      {{ $t('page.transactions.add_transaction') }}
    </router-link>
  </div>

  <section class="space-y-2">
    <div
      class="flex justify-between items-center justify-start w-full gap-4 bg-muted px-4 py-2 rounded-lg text-muted-foreground border border-border overflow-x-scroll">
      <div class="flex items-center">
        <FilterIcon class="text-foreground-muted" />
        <span class="sr-only">Filters</span>
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm" for="nameFilter">Name</label>
        <input type="text" name="nameFilter" id="nameFilter" placeholder="Write here..." v-model="nameFilter">
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm" for="amountFilter">Amount</label>
        <div class="flex gap-2">
          <select name="amountFunction" id="amountFunction" v-model="amountFunction">
            <option value="greater than">{{ ">" }}</option>
            <option value="less than">{{ "<" }}</option>
          </select>
          <input type="number" name="amountFilter" id="amountFilter" v-model="amountFilter">
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm" for="fromFilter">From</label>
        <select name="fromFilter" id="fromFilter" v-model="fromFilter">
          <option :value="undefined">All</option>
          <option v-for="account in accounts.accounts" :key="account.id" :value="account.id">{{ account.name }}</option>
        </select>
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm" for="toFilter">To</label>
        <select name="toFilter" id="toFilter" v-model="toFilter">
          <option :value="undefined">All</option>
          <option v-for="account in accounts.accounts" :key="account.id" :value="account.id">{{ account.name }}</option>
        </select>
      </div>
    </div>

    <div class="w-full overflow-x-scroll">
      <Table :columns="transactionColumns" :data="filteredTransactions"></Table>
    </div>
  </section>
</template>

<style scoped></style>
