<script setup lang="ts">
import TableBody from './TableBody.vue';
import TableFooter from './TableFooter.vue';
import TableHeader from './TableHeader.vue';

import type { Column } from '.';

defineProps({
  columns: Array<Column<unknown>>,
  data: Array<object>
})
</script>

<template>
  <table :aria-label="$t('accessibility.accounts.table')" tabindex="0"
    class="overflow-hidden rounded-lg border w-max min-w-full">
    <slot>
      <table-header :columns="columns"></table-header>
      <table-body :columns="columns" :data="data"></table-body>
      <table-footer :columns="columns" :data="data"></table-footer>
    </slot>
  </table>
</template>

<style scoped>
table {
  border-collapse: separate;
  border-spacing: 0;
  border-color: var(--border);
}
</style>
