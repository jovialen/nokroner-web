<script setup lang="ts">
defineEmits(['click'])
</script>

<template>
  <button @click="$emit('click')"
    class="cursor-pointer aspect-square h-8 w-auto text-muted-foreground hover:bg-muted rounded-lg flex items-center justify-center transition">
    <slot></slot>
  </button>
</template>

<style scoped></style>
