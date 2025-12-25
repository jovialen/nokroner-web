<script setup lang="ts">
import { computed } from 'vue';
import Card from './CardComponent.vue';
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from 'lucide-vue-next';

const props = defineProps({
  title: String,
  number: Number,
  decrease_positive: { type: Boolean, default: false },
  change: { type: Number, default: 1 },
})

const percentage_change = computed(() => Math.abs(Math.round((props.change - 1) * 100)))
const change_is = computed(() => {
  const threshold = props.decrease_positive ? -1 : 1;

  if (props.change > threshold) {
    return "positive"
  } else if (props.change < threshold) {
    return "negative"
  } else {
    return "neutral"
  }
})

const BADGE_STYLE = {
  positive: 'bg-green-200 text-green-500',
  negative: 'bg-red-200 text-red-400',
  neutral: 'bg-yellow-200 text-yellow-400'
}
</script>

<template>
  <Card class="space-y-2">
    <p class="text-xl">{{ $props.title }}</p>
    <p class="font-medium text-3xl text-right">{{ $props.number ?? 0 }} NOK</p>
    <p class="flex gap-1">
      <span class="rounded-sm px-1 flex items-center"
        :class="BADGE_STYLE[change_is]">
        <ArrowUpIcon class="h-3/4 w-auto aspect-square" v-if="change_is === 'positive'" />
        <ArrowDownIcon class="h-3/4 w-auto aspect-square" v-else-if="change_is === 'negative'" />
        <MinusIcon class="h-3/4 w-auto aspect-square" v-else />
        {{ percentage_change }}%
      </span>
      {{ $t("stats.change_month") }}
    </p>
  </Card>
</template>

<style scoped></style>
