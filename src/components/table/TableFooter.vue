<script setup lang="ts">
import TableFooterData from "./TableFooterData.vue"

import { type Column } from '.';

defineProps({
  columns: Array<Column<unknown>>,
  data: Array<object>,
})
</script>

<template>
  <tfoot class="bg-muted text-muted-foreground text-sm">
    <tr>
      <TableFooterData v-for="(column, j) in columns" :key="j" :columns="columns!" :column_index="j" :data="data" />
    </tr>
  </tfoot>
</template>

<style scoped></style>
