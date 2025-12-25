<script setup lang="ts">
defineProps({
  "label": String
})
</script>

<template>
  <section class="bg-card text-card-foreground border border-border p-2 rounded-lg" :aria-label="$props['label']"
    :tabindex="$props.label ? 0 : undefined">
    <slot></slot>
  </section>
</template>

<style scoped></style>
