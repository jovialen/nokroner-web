<script setup lang="ts">
import type { DetailedSavingGoal } from '@/api/schemas';
import api from '@/services/axios';
import { useSavingGoalsStore } from '@/stores/saving_goals';
import { formatMoney, formatPercentage } from '@/utils/format';
import { computed } from 'vue';
import TextButton from '../button/TextButton.vue';

const props = defineProps({
  savingGoal: {
    type: Object,
    required: true
  }
})

const savingGoals = useSavingGoalsStore()

const realSavingGoal = computed(() => props.savingGoal as DetailedSavingGoal);
const progress = computed(() => realSavingGoal.value.saved / realSavingGoal.value.amount)

const complete = async () => {
  await api.patch(`/saving_goals/${realSavingGoal.value.id}`, {
    realized: true
  })
  await savingGoals.fetchSavingGoals()
}

const undo = async () => {
  await api.patch(`/saving_goals/${realSavingGoal.value.id}`, {
    realized: false
  })
  await savingGoals.fetchSavingGoals()
}
</script>

<template>
  <div class="flex flex-col gap-2 text-muted-foreground text-sm" tabindex="0"
    :aria-label="$t('accessibility.saving_goals.saved', realSavingGoal)">
    <div class="flex justify-between items-center">
      <h3 class="text-foreground text-base">{{ realSavingGoal.name }}</h3>
      <div>
        <span class="text-foreground text-base">{{ formatMoney(realSavingGoal.saved, 0) }}</span>
        /
        <span>{{ formatMoney(realSavingGoal.amount, 0) }}</span>
      </div>
    </div>
    <div class="flex gap-2 h-full justify-center items-center" v-if="!realSavingGoal.ready">
      <progress :value="realSavingGoal.saved" :max="realSavingGoal.amount" class="w-full rounded-sm"></progress>
      <span>{{ formatPercentage(progress) }}</span>
    </div>
    <TextButton v-else-if="realSavingGoal.realized" @click="undo()" hover-variant="destructive" class="group">
      <span class="group-hover:hidden">
        {{ $t("components.saving_goals.completed") }}
      </span>
      <span class="group-hover:block hidden">
        {{ $t("components.saving_goals.undo") }}
      </span>
    </TextButton>
    <TextButton v-else @click="complete()" variant="accent" hover-variant="primary">
      {{ $t("components.saving_goals.complete") }}
    </TextButton>
  </div>
</template>

<style scoped></style>
