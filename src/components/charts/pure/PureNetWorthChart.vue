<script setup lang="ts">
import Chart from 'chart.js/auto';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  data: { type: Array<{ period: Date, net_worth: number }>, default: [] },
  period: { type: String, default: "month", validator: (value) => ["year", "month"].includes(value as string) }
})

const { d } = useI18n()

const chartOptions = {
  responsive: true,
  borderRadius: 4.0,
  maintainAspectRatio: false
}

const chartData = computed(() => ({
  labels: props.data.map(data => d(data.period, props.period === "month" ? { month: "short" } : { year: "numeric" })),
  datasets: [{
    label: "Net worth (NOK)",
    data: props.data.map(data => data.net_worth),
    borderColor: "oklch(0.527 0.154 150.069)",
    backgroundColor: "oklch(0.871 0.15 154.449 / 10%)",
    tension: 0.2,
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
