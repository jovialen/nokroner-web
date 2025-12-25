<script setup lang="ts">
import NumericStatCard from '@/components/card/NumericStatCard.vue';
import api from '@/services/axios';
import { computed, ref } from 'vue';

interface AccountProps {
  account_number: string,
  balance: number,
  interest: number,
}

const accounts = ref<AccountProps[]>([]);
const net_worth = computed(() => accounts.value.length > 1 ? accounts.value.map(account => account.balance).reduce((previous, current) => previous + current) : accounts.value[0]?.balance ?? 0)

api.get("/accounts").then((response) => {
  accounts.value = response.data ?? [];
})
</script>

<template>
  <div class="space-y-6">
    <div class="overflow-x-scroll">
      <div class="flex gap-4 w-max pb-2">
        <NumericStatCard :title="$t('stats.net_worth')" :number="net_worth" :change="1.01" />
        <NumericStatCard :title="$t('stats.income')" :number="net_worth" :change="0.80" />
        <NumericStatCard :title="$t('stats.expenses')" :number="net_worth" :change="0.90" decrease_positive />
        <NumericStatCard :title="$t('stats.net_change')" :number="net_worth" :change="1.10" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
