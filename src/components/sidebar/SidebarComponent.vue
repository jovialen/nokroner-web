<script setup lang="ts">
defineProps({
  open: { type: Boolean, default: true }
})
</script>

<template>
  <section :class="open || 'hidden'"
    class="bg-sidebar text-sidebar-foreground p-6 pb-4 md:pr-0 md:w-96 w-full h-screen flex flex-col justify-between">
    <slot></slot>
  </section>
</template>

<style scoped></style>
