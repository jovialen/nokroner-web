<script setup lang="ts">
import type { SavingGoal } from '@/api/schemas';
import { formatMoney } from '@/utils/format';

const props = defineProps({
  savingGoal: {
    type: Object,
    required: true
  }
})

const realSavingGoal = props.savingGoal as SavingGoal;
</script>

<template>
  <div class="space-y-2">
    <div class="flex justify-between items-center">
      <h3>{{ realSavingGoal.name }}</h3>
      <div>
        <span>{{ formatMoney(realSavingGoal.saved, 0) }}</span>
        /
        <span>{{ formatMoney(realSavingGoal.amount, 0) }}</span>
      </div>
    </div>
    <progress :value="realSavingGoal.saved" :max="realSavingGoal.amount" class="w-full rounded-sm">Hi!</progress>
  </div>
</template>

<style scoped></style>
