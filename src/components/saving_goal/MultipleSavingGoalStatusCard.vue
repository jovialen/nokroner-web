<script setup lang="ts">
import { type SavingGoal } from '@/api/schemas';
import Card from '../card/CardComponent.vue';
import SavingGoalStatus from './SavingGoalStatus.vue';
import { RouterLink } from 'vue-router';
import { PlusIcon } from 'lucide-vue-next';

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
      <router-link to="/saving-goal/create"
        class="flex justify-center items-center px-4 py-2 items-center rounded-lg text-muted-foreground hover:bg-muted transition">
        <PlusIcon />
        {{ $t("components.saving_goals.create") }}
      </router-link>
    </div>
  </Card>
</template>

<style scoped></style>
