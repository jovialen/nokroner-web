<script setup lang="ts">
import Card from '../card/CardComponent.vue';
</script>

<template>
  <Card class="px-6 py-4 space-y-2">
    <div class="flex justify-between items-center">
      <div class="flex gap-2">
        <slot name="headerLeft"></slot>
      </div>
      <div class="flex gap-2">
        <slot name="headerRight"></slot>
      </div>
    </div>
    <slot></slot>
  </Card>
</template>

<style scoped></style>
