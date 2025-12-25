<script setup lang="ts">
import NumericStatCard from '@/components/card/NumericStatCard.vue';
import StatBar from '@/components/card/StatBar.vue';

import type { Account } from '@/api/schemas';
import api from '@/services/axios';
import { computed, ref } from 'vue';

const accounts = ref<Account[]>([]);
const net_worth = computed(() => accounts.value.length > 1 ? accounts.value.map(account => account.balance).reduce((previous, current) => previous + current) : accounts.value[0]?.balance ?? 0)

api.get("/accounts").then((response) => {
  accounts.value = response.data ?? [];
})
</script>

<template>
  <h1 class="text-xl">{{ $t("page.overview.title") }}</h1>

  <StatBar>
    <NumericStatCard :title="$t('stats.net_worth')" :number="net_worth" :change="1.01" />
    <NumericStatCard :title="$t('stats.income')" :number="net_worth" :change="0.80" />
    <NumericStatCard :title="$t('stats.expenses')" :number="net_worth" :change="0.90" decrease_positive />
    <NumericStatCard :title="$t('stats.net_change')" :number="net_worth" :change="1" />
  </StatBar>
</template>

<style scoped></style>
