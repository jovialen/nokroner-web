<script setup lang="ts">
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from 'lucide-vue-next';
import { computed } from 'vue';
import { formatPercentage } from '@/utils/format';

const props = defineProps({
  percentage: {
    type: Number,
    required: true,
  },
  baseline: {
    type: Number,
    default: 1
  },
  decrease_positive: {
    type: Boolean,
    default: false
  }
})

const normalized_percentage = computed(() => props.percentage - props.baseline)
const change_is = computed(() => {
  const threshold = props.decrease_positive ? -1 : 1;

  if (normalized_percentage.value * threshold > 0) {
    return "positive"
  } else if (normalized_percentage.value * threshold < 0) {
    return "negative"
  } else {
    return "neutral"
  }
})

const BADGE_STYLE = {
  positive: 'bg-green-200 text-green-600',
  negative: 'bg-red-200 text-red-500',
  neutral: 'bg-yellow-100 text-yellow-600'
}
</script>

<template>
  <span class="rounded-sm px-1 flex items-center w-min" :class="BADGE_STYLE[change_is]">
    <ArrowUpIcon class="h-3/4 w-auto aspect-square" v-if="change_is === 'positive'" />
    <ArrowDownIcon class="h-3/4 w-auto aspect-square" v-else-if="change_is === 'negative'" />
    <MinusIcon class="h-3/4 w-auto aspect-square" v-else />
    {{ formatPercentage(Math.abs(normalized_percentage)) }}
  </span>
</template>

<style scoped></style>
