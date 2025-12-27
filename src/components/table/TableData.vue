<script setup lang="ts">
import { h } from 'vue'
import { type Column } from '.'

const props = defineProps({
  columns: { type: Array<Column<unknown>>, required: true },
  column_index: { type: Number, required: true },
  data: { validator: () => true, required: true },
})

const column = props.columns[props.column_index]
const comp = column?.cell
  ? column.cell(props.data)
  : h('p', {}, '' + props.data)
</script>

<template>
  <td class="p-2">
    <component :is="comp" />
  </td>
</template>

<style scoped></style>
