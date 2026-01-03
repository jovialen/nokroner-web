<script setup lang="ts">
import ChartBase from './ChartBase.vue';
import PureIncomeExpenseChart from './pure/PureIncomeExpenseChart.vue';
import InputNumber from '../input/InputNumber.vue';
import InputPeriodSelector from './InputPeriodSelector.vue';
import { ref, watch } from 'vue';
import api from '@/services/axios';

const props = defineProps({
  owner: { type: Number, required: true }
})

const year = ref(new Date().getFullYear())
const period = ref("month")

const apiData = ref([])

watch([() => props.owner, year, period], async () => {
  try {
    const response = await api.get(`/owners/${props.owner}/money_flow?year=${year.value}&period=${period.value}`)
    apiData.value = response.data?.all ?? []
  } catch (err) {
    console.error("Failed to fetch money flow data:", err)
    apiData.value = []
  }
}, { immediate: true })
</script>

<template>
  <ChartBase>
    <template #headerLeft>
      <h2 class="text-xl">Pengeflyt</h2>
    </template>
    <template #headerRight>
      <InputNumber v-model="year" label-hidden class="w-28">{{ $t("schema.period.year") }}</InputNumber>
      <InputPeriodSelector v-model="period" />
    </template>

    <PureIncomeExpenseChart :data="apiData" :month-labels="period === 'month'" />
  </ChartBase>
</template>

<style scoped></style>
