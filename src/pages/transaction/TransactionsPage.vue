<script setup lang="ts">
import { PlusIcon } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import FilteredTransactionsTable from '@/components/transactions/table/FilteredTransactionsTable.vue'

import { useTransactionsStore } from '@/stores/accounts'

const transactions = useTransactionsStore()
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

  <section>
    <FilteredTransactionsTable :transactions="transactions.userTransactions" />
  </section>
</template>

<style scoped></style>
