<script setup lang="ts">
defineModel("open")
</script>

<template>
  <button @click="$emit('update:open', !open)"
    class="p-2 flex justify-center items-center border border-border rounded-lg bg-card text-muted-foreground hover:bg-muted transition">
    <slot></slot>
    <span v-if="!open" class="sr-only">{{ $t("accessibility.sidebar.open_sidebar") }}</span>
    <span v-else class="sr-only">{{ $t("accessibility.sidebar.close_sidebar") }}</span>
  </button>
</template>
