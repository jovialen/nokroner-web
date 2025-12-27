<script setup lang="ts">
import { XIcon } from 'lucide-vue-next';

defineModel("open")
</script>

<template>
  <div class="flex justify-between items-center">
    <slot></slot>
    <button @click="$emit('update:open', false)" class="text-muted-foreground md:hidden block">
      <x-icon />
      <span class="sr-only">{{ $t("accessibility.sidebar.close_sidebar") }}</span>
    </button>
  </div>
</template>

<style scoped></style>
