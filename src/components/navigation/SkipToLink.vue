<script setup lang="ts">
  const props = defineProps({
    href: { type: String, required: true },
  })
</script>

<template>
  <a :href="props.href" class="absolute left-0 -top-6 opacity-0 focus:opacity-100">
    <slot></slot>
  </a>
</template>

<style scoped></style>
