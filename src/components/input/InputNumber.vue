<script setup lang="ts">
const model = defineModel()

defineProps({
  labelHidden: Boolean
})
</script>

<template>
  <div class="space-y-2">
    <label for="numberInput" :class="labelHidden && 'sr-only'">
      <slot>Missing label</slot>
    </label>
    <input type="number" class="px-4 py-2 border border-border rounded-lg w-full" v-model="model">
  </div>
</template>

<style scoped></style>
