<script setup lang="ts">
import SkipToLink from './SkipToLink.vue';
</script>

<template>
  <nav class="relative">
    <skip-to-link id="nav" href="#content">{{ $t("navigation.skip_to_content") }}</skip-to-link>
    <skip-to-link href="#end-nav">{{ $t("navigation.skip_to_end") }}</skip-to-link>
    <ul class="flex flex-col gap-1">
      <slot></slot>
    </ul>
    <skip-to-link id="end-nav" href="#nav">{{ $t("navigation.skip_to_start") }}</skip-to-link>
  </nav>
</template>

<style scoped></style>
