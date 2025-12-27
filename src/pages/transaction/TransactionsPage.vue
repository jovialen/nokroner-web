<script setup lang="ts">
import { PlusIcon } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';

import { useTransactionsStore } from '@/stores/accounts';
import { Table } from '@/components/table';
import { transactionColumns } from './columns';

const transactions = useTransactionsStore()
</script>

<template>
  <div class="flex justify-between items-center">
    <h1 class="text-xl">{{ $t("navigation.transactions") }}</h1>

    <router-link to="/account/create"
      class="flex items-center bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4 py-2 transition">
      <PlusIcon />
      {{ $t("page.transactions.add_transaction") }}
    </router-link>
  </div>

  <section class="w-full overflow-x-scroll">
    <Table :columns="transactionColumns" :data="transactions.userTransactions"></Table>
  </section>
</template>

<style scoped></style>
