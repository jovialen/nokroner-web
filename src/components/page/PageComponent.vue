<script setup lang="ts">
import Card from '../card/CardComponent.vue'
</script>

<template>
  <div
    class="container mx-auto max-h-screen py-4 pr-4 min-h-full overflow-y-scroll"
  >
    <Card class="grow shadow min-h-full p-6">
      <slot></slot>
    </Card>
  </div>
</template>

<style scoped></style>
