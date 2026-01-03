<script setup lang="ts">
import InputSelector from '../input/InputSelector.vue';

const model = defineModel()
</script>

<template>
  <InputSelector v-model="model" :options="[
    { label: $t('page.overview.per_period', { period: $t('schema.period.month') }), value: 'month' },
    { label: $t('page.overview.per_period', { period: $t('schema.period.week') }), value: 'week' }]" label-hidden>
    {{ $t('schema.period.period') }}
  </InputSelector>
</template>

<style scoped></style>
