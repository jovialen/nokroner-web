<script setup lang="ts">
import Card from './CardComponent.vue'
import PercentageBadge from '../badge/PercentageBadge.vue'
import { formatMoney } from '@/utils/format';

defineProps({
  title: String,
  number: Number,
  decrease_positive: { type: Boolean, default: false },
  change: { type: Number, default: 1 },
})
</script>

<template>
  <Card class="space-y-2 px-6 py-4">
    <p class="text-xl">{{ title }}</p>
    <p class="font-medium text-3xl text-right">{{ formatMoney(number ?? 0) }}</p>
    <p class="flex gap-1" v-if="!isNaN(change) && isFinite(change)">
      <PercentageBadge :percentage="change" :decrease_positive="decrease_positive" />
      {{ $t('stats.change_month') }}
    </p>
  </Card>
</template>

<style scoped></style>
