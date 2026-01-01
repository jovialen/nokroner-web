<script setup lang="ts">
import Chart from 'chart.js/auto';
import { ref, watchEffect } from 'vue';

const chartOptions = {
  scales: {
    y: {
      beginAtZero: true
    }
  },
  borderRadius: 4.0,
  maintainAspectRatio: false
}

const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jul", "Jun", "Aug", "Sep", "Oct", "Nov", "Des"],
  datasets: [{
    label: "Income",
    data: [12, 19, 5, 4, 11, 8, 9, 10, 11, 12, 7, 1],
    backgroundColor: "oklch(0.527 0.154 150.069)"
  }, {
    label: "Expenses",
    data: [12, 19, 5, 4, 11, 8, 9, 10, 11, 12, 7, 1],
    backgroundColor: "oklch(0.871 0.15 154.449)",
  }]
}

const canvas = ref(null)

watchEffect(() => {
  if (canvas.value) {
    new Chart(canvas.value, {
      type: "bar",
      data: chartData,
      options: chartOptions,
    })
  }
})
</script>

<template>
  <div class="h-72 w-full">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style scoped></style>
