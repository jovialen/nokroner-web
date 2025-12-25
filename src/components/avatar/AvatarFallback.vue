<script setup lang="ts">
defineProps({
  show: Boolean,
})

</script>

<template>
  <span
    :class="($props.show ?? true) ? '' : 'hidden'"
    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-white text-lg"
  >
    <slot></slot>
  </span>
</template>

<style scoped></style>
