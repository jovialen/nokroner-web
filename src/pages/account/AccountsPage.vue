<script setup lang="ts">
import { PlusIcon } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';

import { useAccountsStore } from '@/stores/accounts';
import { computed } from 'vue';
import { Table } from '@/components/table';
import { account_columns } from './columns';

const accounts = useAccountsStore()

const data = computed(() => accounts.user_accounts.map(({ name, account_number, balance, interest }) => ({
  name,
  account_number,
  balance,
  interest,
  change_percent: 0,
  change_actual: 0,
  trend_percent: 0,
  trend_actual: 0,
})))
</script>

<template>
  <div class="flex justify-between items-center">
    <h1 class="text-xl">{{ $t("page.accounts.my_accounts") }}</h1>

    <router-link to="/account/create"
      class="flex items-center bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4 py-2 transition">
      <PlusIcon />
      {{ $t("page.accounts.add_account") }}
    </router-link>
  </div>

  <section class="w-full overflow-x-scroll">
    <Table :columns="account_columns" :data="data"></Table>
  </section>
</template>

<style scoped></style>
