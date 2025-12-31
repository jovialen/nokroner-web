<script setup lang="ts">
import { Table } from '@/components/table';

import { type Transaction } from '@/api/schemas';
import { transactionColumns } from './columns';
import { watch } from 'vue';

const props = defineProps({
  transactions: Array<Transaction>
})
watch(props, () => console.log("Table", props.transactions))
</script>

<template>
  <div class="w-full overflow-x-scroll">
    <Table :columns="transactionColumns" :data="transactions ?? []"></Table>
  </div>
</template>

<style scoped></style>
