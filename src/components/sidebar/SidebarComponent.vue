<script setup lang="ts">
defineProps({
  open: { type: Boolean, default: true }
})
</script>

<template>
  <section :class="open || 'hidden'"
    class="bg-sidebar text-sidebar-foreground pt-6 pl-6 pb-4 w-96 h-screen flex flex-col justify-between">
    <slot></slot>
  </section>
</template>

<style scoped></style>
