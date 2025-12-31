<script setup lang="ts">
import NumericStatCard from '@/components/card/NumericStatCard.vue'
import StatBar from '@/components/card/StatBar.vue'
import { useUserOwnerStore } from '@/stores/owners'

const userOwner = useUserOwnerStore()
</script>

<template>
  <h1 class="text-xl">{{ $t('page.overview.title') }}</h1>

  <StatBar v-if="userOwner.userOwner">
    <NumericStatCard :title="$t('stats.net_worth')" :number="userOwner.userOwner!.net_worth"
      :change="userOwner.userOwner!.net_worth / userOwner.userOwner!.net_worth_last_month" />
    <NumericStatCard :title="$t('stats.income')" :number="userOwner.userOwner.recent_income"
      :change="userOwner.userOwner!.recent_income / userOwner.userOwner!.previous_income" />
    <NumericStatCard :title="$t('stats.expenses')" :number="userOwner.userOwner!.recent_expenses"
      :change="userOwner.userOwner!.recent_expenses / userOwner.userOwner!.previous_expenses" decrease_positive />
    <NumericStatCard :title="$t('stats.net_change')"
      :number="userOwner.userOwner!.recent_income - userOwner.userOwner!.recent_expenses"
      :change="(userOwner.userOwner!.recent_income - userOwner.userOwner!.recent_expenses) / (userOwner.userOwner!.previous_income - userOwner.userOwner!.previous_expenses)" />
  </StatBar>
</template>

<style scoped></style>
