<script setup lang="ts">
import type { Column } from '.'
import TableHead from './TableHead.vue'

defineProps({
  columns: Array<Column<unknown>>,
})
</script>

<template>
  <thead class="bg-muted text-muted-foreground text-sm font-normal text-left">
    <tr>
      <TableHead
        v-for="(column, j) in columns"
        :key="j"
        :columns="columns!"
        :column_index="j"
      />
    </tr>
  </thead>
</template>

<style scoped></style>
