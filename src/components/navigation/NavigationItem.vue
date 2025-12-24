<script setup lang="ts">
import { RouterLink } from 'vue-router'
const props = defineProps({
  to: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <li>
    <router-link :to="props.to">
      <slot></slot>
    </router-link>
  </li>
</template>

<style scoped></style>
