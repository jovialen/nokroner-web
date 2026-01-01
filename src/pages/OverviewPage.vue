<script setup lang="ts">
import Card from '@/components/card/CardComponent.vue';
import NumericStatCard from '@/components/card/NumericStatCard.vue'
import StatBar from '@/components/card/StatBar.vue'
import IncomeExpenseChart from '@/components/charts/IncomeExpenseChart.vue';
import { useUserOwnerStore } from '@/stores/owners'

const userOwner = useUserOwnerStore()
</script>

<template>
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

  <Card class="px-6 py-4 space-y-2">
    <div class="flex justify-between items-center">
      <h2 class="text-xl">Pengeflyt</h2>
      <select name="graphPeriod" id="graphPeriod" class="px-4 py-2 border border-border rounded-lg">
        <option value="monthly">Per måned</option>
        <option value="weekly">Per uke</option>
      </select>
    </div>
    <IncomeExpenseChart />
  </Card>
</template>

<style scoped></style>
