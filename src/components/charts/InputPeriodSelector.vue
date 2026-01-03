<script setup lang="ts">
import InputSelector from '../input/InputSelector.vue';

const model = defineModel()

defineProps({
  includeYear: Boolean,
  includeMonth: Boolean,
  includeWeek: Boolean
})
</script>

<template>
  <InputSelector v-model="model" :options="[
    includeYear ? { label: $t('page.overview.per_period', { period: $t('schema.period.year') }), value: 'year' } : undefined,
    includeMonth ? { label: $t('page.overview.per_period', { period: $t('schema.period.month') }), value: 'month' } : undefined,
    includeWeek ? { label: $t('page.overview.per_period', { period: $t('schema.period.week') }), value: 'week' } : undefined]
    .filter(v => v != undefined)" label-hidden>
    {{ $t('schema.period.period') }}
  </InputSelector>
</template>

<style scoped></style>
