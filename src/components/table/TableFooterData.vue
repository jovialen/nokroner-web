<script setup lang="ts">
import { computed, h } from 'vue'
import { getColumnData, type Column } from '.'

const props = defineProps({
  columns: { type: Array<Column<unknown>>, required: true },
  column_index: { type: Number, required: true },
  data: Array<object>,
})

const column = props.columns[props.column_index]!
const columnData = computed(() =>
  props.data ? getColumnData(column, props.data) : undefined,
)
const processedData = computed(() =>
  column.footerFunction !== undefined &&
  columnData.value !== undefined &&
  props.data !== undefined
    ? column.footerFunction(columnData.value, props.columns, props.data)
    : undefined,
)
const comp = computed(() =>
  column.footer
    ? column.footer(processedData.value)
    : h('p', {}, '' + processedData.value),
)
</script>

<template>
  <td class="p-2">
    <component v-if="processedData !== undefined" :is="comp" />
  </td>
</template>

<style scoped></style>
