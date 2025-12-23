<script setup lang="ts">
import Card from '../card/CardComponent.vue';

</script>

<template>
  <div class="container mx-auto max-h-screen overflow-y-scroll">
    <Card class="grow my-4 mr-4 rounded-lg min-h-full">
      <slot></slot>
    </Card>
  </div>
</template>

<style scoped></style>
