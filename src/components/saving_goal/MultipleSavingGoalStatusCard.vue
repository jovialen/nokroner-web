<script setup lang="ts">
import { type SavingGoal } from '@/api/schemas';
import Card from '../card/CardComponent.vue';
import SavingGoalStatus from './SavingGoalStatus.vue';

defineProps({
  savingGoals: {
    type: Array<SavingGoal>,
    default: []
  }
})
</script>

<template>
  <Card>
    <h2 class="text-lg">{{ $t("components.saving_goals.title") }}</h2>
    <div class="grid grid-cols-3 gap-4">
      <SavingGoalStatus v-for="savingGoal in savingGoals" :key="savingGoal.id" :saving-goal="savingGoal" />
    </div>
  </Card>
</template>

<style scoped></style>
