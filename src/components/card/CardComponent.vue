<script setup lang="ts">
defineProps({
  label: String,
})
</script>

<template>
  <section class="bg-card text-card-foreground border border-border px-6 py-4 rounded-lg space-y-2"
    :aria-label="$props['label']" :tabindex="$props.label ? 0 : undefined">
    <slot></slot>
  </section>
</template>

<style scoped></style>
