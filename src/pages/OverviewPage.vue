<script setup lang="ts">
import NumericStatCard from '@/components/card/NumericStatCard.vue';
import StatBar from '@/components/card/StatBar.vue';
import { useOwnersStore } from '@/stores/owners';

const owners = useOwnersStore()
</script>

<template>
  <h1 class="text-xl">{{ $t("page.overview.title") }}</h1>

  <StatBar>
    <NumericStatCard :title="$t('stats.net_worth')" :number="owners.user_owner?.net_worth" :change="1.01" />
    <NumericStatCard :title="$t('stats.income')" :number="owners.user_owner?.net_worth" :change="0.80" />
    <NumericStatCard :title="$t('stats.expenses')" :number="owners.user_owner?.net_worth" :change="0.90" decrease_positive />
    <NumericStatCard :title="$t('stats.net_change')" :number="owners.user_owner?.net_worth" :change="1" />
  </StatBar>
</template>

<style scoped></style>
