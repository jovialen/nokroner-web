<script setup lang="ts">
import { h } from 'vue'
import { type Column } from '.'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  columns: { type: Array<Column<unknown>>, required: true },
  column_index: { type: Number, required: true },
})

const { t } = useI18n({ useScope: 'global' })

const column = props.columns[props.column_index]!

let name
if (column.i18n) {
  if (typeof column.i18n === 'string') {
    name = t(column.i18n)
  } else {
    name = t(column.i18n.key, column.i18n.props)
  }
} else {
  name = column.name
}

const comp = column.header ? column.header(column) : h('p', {}, name)
</script>

<template>
  <th class="p-2 font-normal">
    <component :is="comp" />
  </th>
</template>

<style scoped></style>
