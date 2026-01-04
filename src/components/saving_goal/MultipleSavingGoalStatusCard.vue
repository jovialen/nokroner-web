<script setup lang="ts">
import { type SavingGoal } from '@/api/schemas';
import Card from '../card/CardComponent.vue';
import SavingGoalStatus from './SavingGoalStatus.vue';
import { PlusIcon } from 'lucide-vue-next';
import TextButton from '../button/TextButton.vue';

defineProps({
  savingGoals: {
    type: Array<SavingGoal>,
    default: []
  },
  createNewAction: Boolean,
})
</script>

<template>
  <Card>
    <h2 class="text-lg">{{ $t("components.saving_goals.title") }}</h2>
    <div class="grid xl:grid-cols-3 lg:grid-cols-2 gap-6" :class="savingGoals.length === 0 && 'grid-cols-1!'">
      <SavingGoalStatus v-for="savingGoal in savingGoals" :key="savingGoal.id" :saving-goal="savingGoal" />
      <TextButton to="/saving-goal/create" variant="muted">
        <PlusIcon />
        {{ $t("components.saving_goals.create") }}
      </TextButton>
    </div>
  </Card>
</template>

<style scoped></style>
