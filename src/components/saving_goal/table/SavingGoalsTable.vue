<script setup lang="ts">
import { Table } from '@/components/table';

import { type SavingGoal } from '@/api/schemas';
import { savingGoalsColumns } from './columns';

defineProps({
  savingGoals: Array<SavingGoal>,
})
</script>

<template>
  <div class="w-full overflow-x-scroll">
    <Table :columns="savingGoalsColumns" :data="savingGoals ?? []"></Table>
  </div>
</template>

<style scoped></style>
