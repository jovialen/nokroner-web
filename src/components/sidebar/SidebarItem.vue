<script setup lang="ts">
const props = defineProps({
  selected: Boolean,
})
</script>

<template>
  <div
    class="flex p-2 gap-2 w-full text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors rounded-lg"
    :class="
      props.selected && 'bg-sidebar-accent text-sidebar-accent-foreground'
    "
  >
    <slot></slot>
  </div>
</template>

<style scoped></style>
