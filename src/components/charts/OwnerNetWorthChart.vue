<script setup lang="ts">
import ChartBase from './ChartBase.vue';
import PureNetWorthChart from './pure/PureNetWorthChart.vue';
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
    const response = await api.get(`/owners/${props.owner}/history?period=${period.value}`)
    apiData.value = response.data?.history ?? []
  } catch (err) {
    console.error("Failed to fetch money flow data:", err)
    apiData.value = []
  }
}, { immediate: true })
</script>

<template>
  <ChartBase>
    <template #headerLeft>
      <h2 class="text-xl">{{ $t("chart.net_worth.title") }}</h2>
    </template>
    <template #headerRight>
      <InputPeriodSelector v-model="period" include-year include-month />
    </template>

    <PureNetWorthChart :data="apiData" :month-labels="period === 'month'" />
  </ChartBase>
</template>

<style scoped></style>
