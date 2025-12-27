<script setup lang="ts">
import { useAccountsStore } from '@/stores/accounts';
import { formatPercentage } from '@/utils/format';
import { EllipsisVerticalIcon } from 'lucide-vue-next';

const accounts = useAccountsStore();
</script>

<template>
  <h1 class="text-xl">{{ $t("page.accounts.my_accounts") }}</h1>

  <section class="w-full overflow-x-scroll">
    <table :aria-label="$t('accessibility.accounts.table')" tabindex="0"
      class="w-full overflow-hidden rounded-lg border">
      <thead class="bg-muted text-muted-foreground text-sm">
        <tr>
          <th>{{ $t("page.accounts.table.name") }}</th>
          <th>{{ $t("page.accounts.table.account_number") }}</th>
          <th>{{ $t("page.accounts.table.balance") }}</th>
          <th>{{ $t("page.accounts.table.interest") }}</th>
          <th>%{{ $t("page.accounts.table.change", { period: "1D" }) }}</th>
          <th>{{ $t("page.accounts.table.change", { period: "1D" }) }}</th>
          <th>%{{ $t("page.accounts.table.trend") }}</th>
          <th>{{ $t("page.accounts.table.trend") }}</th>
          <th><span class="sr-only">{{ $t("accessibility.table.actions") }}</span></th>
        </tr>
      </thead>

      <tbody class="text-lg text-muted-foreground">
        <tr v-for="account in accounts.user_accounts" :key="account.name"
          class="even:bg-muted hover:bg-primary hover:text-primary-foreground transition">
          <th scope="row">{{ account.name }}</th>
          <td>{{ account.account_number }}</td>
          <td>{{ account.balance }} NOK</td>
          <td>{{ formatPercentage(account.interest - 1, 1) }}</td>
          <td>{{ formatPercentage(0) }}</td>
          <td>0</td>
          <td>{{ formatPercentage(0) }}</td>
          <td>0</td>
          <td class="flex items-center justify-center">
            <button>
              <span class="sr-only">{{ $t("accessibility.table.actions") }}</span>
              <EllipsisVerticalIcon />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
@reference "tailwindcss";

table {
  border-collapse: separate;
  border-spacing: 0;
  border-color: var(--border);
}

th,
td {
  @apply px-4 py-2;
  text-align: left;
  font-weight: normal;
}
</style>
