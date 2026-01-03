<script setup lang="ts">
const model = defineModel()

defineProps({
  labelHidden: Boolean,
  options: Array<{ label: string, value: string }>
})
</script>

<template>
  <div class="space-y-2">
    <label for="selectorInput" :class="labelHidden && 'sr-only'">
      <slot>Missing label</slot>
    </label>
    <select name="selectorInput" id="selectorInput" v-model="model"
      class="px-4 py-2 border border-border rounded-lg w-full">
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
    </select>
  </div>
</template>

<style scoped></style>
