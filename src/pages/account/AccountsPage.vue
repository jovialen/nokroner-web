<script setup lang="ts">
import { EllipsisVerticalIcon, PlusIcon } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';
import PercentageBadge from '@/components/badge/PercentageBadge.vue';

import { useAccountsStore } from '@/stores/accounts';
import { formatPercentage } from '@/utils/format';
import { ref, watchEffect } from 'vue';

const accounts = useAccountsStore()

const total_balance = ref(0)
const weighted_interest = ref(0)

watchEffect(() => {
  // Calculate the total balance
  total_balance.value = accounts.user_accounts.map(account => account.balance).reduce((a, b) => a + b, 0)

  // Calculate the equivalent interest for the total balance from the
  // individual interests
  const total_interest = accounts.user_accounts.map(account => account.balance * account.interest).reduce((a, b) => a + b, 0)
  weighted_interest.value = total_interest / total_balance.value
})
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
    <table :aria-label="$t('accessibility.accounts.table')" tabindex="0"
      class="overflow-hidden rounded-lg border w-max min-w-full">
      <thead class="bg-muted text-muted-foreground text-sm">
        <tr>
          <th>{{ $t("schema.account.name") }}</th>
          <th>{{ $t("schema.account.account_number") }}</th>
          <th>{{ $t("schema.account.balance") }}</th>
          <th>{{ $t("schema.account.interest") }}</th>
          <th>{{ $t("page.accounts.table.change", { period: "1D", unit: "%" }) }}</th>
          <th>{{ $t("page.accounts.table.change", { period: "1D", unit: "NOK" }) }}</th>
          <th>{{ $t("page.accounts.table.trend", { period: "1M", unit: "%" }) }}</th>
          <th>{{ $t("page.accounts.table.trend", { period: "1M", unit: "NOK" }) }}</th>
          <th><span class="sr-only">{{ $t("accessibility.table.actions") }}</span></th>
        </tr>
      </thead>

      <tbody class="text-muted-foreground">
        <tr v-for="account in accounts.user_accounts" :key="account.name"
          class="even:bg-muted hover:bg-primary hover:text-primary-foreground transition">
          <th scope="row">{{ account.name }}</th>
          <td>{{ account.account_number }}</td>
          <td>{{ account.balance }} <span>NOK</span></td>
          <td>{{ formatPercentage(account.interest - 1, 1) }}</td>
          <td>
            <PercentageBadge :percentage="0" :baseline="0" />
          </td>
          <td>0 <span>NOK</span></td>
          <td>
            <PercentageBadge :percentage="0" :baseline="0" />
          </td>
          <td>0 <span>NOK/month</span></td>
          <td class="flex items-center justify-center">
            <button>
              <span class="sr-only">{{ $t("accessibility.table.actions") }}</span>
              <EllipsisVerticalIcon />
            </button>
          </td>
        </tr>

        <div v-if="accounts.user_accounts.length === 0"></div>
      </tbody>

      <tfoot class="bg-muted text-muted-foreground text-sm">
        <tr>
          <th scope="row">{{ $t("page.accounts.table.total") }}</th>
          <td></td>
          <td>{{ total_balance }} NOK</td>
          <td>{{ formatPercentage(weighted_interest - 1, 1) }}</td>
          <td>
            <PercentageBadge :percentage="0" :baseline="0" />
          </td>
          <td>0 NOK</td>
          <td>
            <PercentageBadge :percentage="0" :baseline="0" />
          </td>
          <td>0 NOK</td>
          <td></td>
        </tr>
      </tfoot>
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

tr {
  padding: calc(var(--spacing) * 4);
}

th,
td {
  padding: calc(var(--spacing) * 2);
  text-align: left;
  font-weight: normal;
}

td>span {
  @apply text-sm;
}
</style>
