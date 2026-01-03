<script setup lang="ts">
import Chart from 'chart.js/auto';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  data: { type: Array<{ period: Date, income: number, expenses: number }>, default: [] },
  monthLabels: Boolean
})

const chartOptions = {
  responsive: true,
  scales: { y: { beginAtZero: false } },
  borderRadius: 4.0,
  maintainAspectRatio: false
}

const { t, d } = useI18n()

const chartData = computed(() => ({
  labels: props.data.map(data => props.monthLabels ? d(data.period, { month: "short" }) : d(data.period)),
  datasets: [
    {
      label: t("chart.money_flow.income"),
      data: props.data.map(d => d.income),
      backgroundColor: "oklch(0.527 0.154 150.069)"
    },
    {
      label: t("chart.money_flow.expenses"),
      data: props.data.map(d => d.expenses),
      backgroundColor: "oklch(0.871 0.15 154.449)"
    }]
}))

const canvas = ref<HTMLCanvasElement | null>(null)
const chartInstance = ref<Chart | null>(null)

watch([canvas, chartData], () => {
  if (canvas.value === null) return

  if (chartInstance.value !== null) {
    chartInstance.value.destroy()
  }

  chartInstance.value = new Chart(canvas.value, {
    type: "bar",
    data: chartData.value,
    options: chartOptions
  })
})
</script>

<template>
  <div class="h-72 w-full">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style scoped></style>
