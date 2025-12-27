<script setup lang="ts">
import { getCellData, type Column } from '.'
import TableData from './TableData.vue'

defineProps({
  columns: Array<Column<unknown>>,
  data: Array<object>,
})
</script>

<template>
  <tbody class="text-muted-foreground">
    <tr v-for="(row, i) in data" :key="i" class="even:bg-muted">
      <TableData
        v-for="(column, j) in columns"
        :key="j"
        :columns="columns!"
        :column_index="j"
        :data="getCellData(column, row)"
      />
    </tr>
  </tbody>
</template>

<style scoped></style>
