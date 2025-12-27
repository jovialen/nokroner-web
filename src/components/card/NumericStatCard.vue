<script setup lang="ts">
import Card from './CardComponent.vue'
import PercentageBadge from '../badge/PercentageBadge.vue'

const props = defineProps({
  title: String,
  number: Number,
  decrease_positive: { type: Boolean, default: false },
  change: { type: Number, default: 1 },
})
</script>

<template>
  <Card class="space-y-2 px-6 py-4">
    <p class="text-xl">{{ $props.title }}</p>
    <p class="font-medium text-3xl text-right">{{ $props.number ?? 0 }} NOK</p>
    <p class="flex gap-1">
      <PercentageBadge
        :percentage="props.change"
        :decrease_positive="$props.decrease_positive"
      />
      {{ $t('stats.change_month') }}
    </p>
  </Card>
</template>

<style scoped></style>
