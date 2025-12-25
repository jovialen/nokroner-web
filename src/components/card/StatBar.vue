<script lang="ts"></script>

<template>
  <section class="overflow-x-scroll" :aria-label="$t('accessibility.overview.core_stats')" tabindex="0">
    <div class="flex gap-4 w-max pb-2">
      <slot></slot>
    </div>
  </section>
</template>

<style scoped></style>
