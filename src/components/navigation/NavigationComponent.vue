<script setup lang="ts">
import SkipToLink from './SkipToLink.vue';
</script>

<template>
  <nav class="relative">
    <skip-to-link id="nav" href="#content">Hopp til innhold</skip-to-link>
    <skip-to-link href="#end-nav">Hopp til slutt</skip-to-link>
    <ul class="flex flex-col gap-1">
      <slot></slot>
    </ul>
    <skip-to-link id="end-nav" href="#nav">Hopp til start</skip-to-link>
  </nav>
</template>

<style scoped></style>
