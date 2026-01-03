<script setup lang="ts">
import SavingGoalsTable from '@/components/saving_goal/table/SavingGoalsTable.vue';
import { useSavingGoalsStore } from '@/stores/saving_goals';

const savingGoals = useSavingGoalsStore()
</script>

<template>
  <h1 class="text-xl">{{ $t("navigation.saving_goals") }}</h1>

  <SavingGoalsTable :saving-goals="savingGoals.savingGoals" />
</template>

<style scoped></style>
