<script setup lang="ts">
import NumericStatCard from '@/components/card/NumericStatCard.vue'
import StatBar from '@/components/card/StatBar.vue'
import { useUserOwnerStore } from '@/stores/owners'
import OwnerIncomeExpenseChart from '@/components/charts/OwnerIncomeExpenseChart.vue';
import OwnerNetWorthChart from '@/components/charts/OwnerNetWorthChart.vue';
import MultipleSavingGoalStatusCard from '@/components/saving_goal/MultipleSavingGoalStatusCard.vue';
import { useSavingGoalsStore } from '@/stores/saving_goals';

const userOwner = useUserOwnerStore()
const savingGoals = useSavingGoalsStore()
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

  <section class="grid lg:grid-cols-2 grid-cols-1 gap-6">
    <OwnerIncomeExpenseChart v-if="userOwner.userOwner" :owner="userOwner.userOwner.id" />
    <OwnerNetWorthChart v-if="userOwner.userOwner" :owner="userOwner.userOwner.id" />
  </section>

  <section>
    <MultipleSavingGoalStatusCard :saving-goals="savingGoals.savingGoals.filter(s => !s.archived)" />
  </section>
</template>

<style scoped></style>
