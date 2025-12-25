<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits(['failed'])

defineProps({
  src: {
    type: String,
    required: true,
  },
})

const failed = ref(false)

watch(
  [failed],
  () => {
    if (failed.value) {
      emit('failed')
    }
  },
)
</script>

<template>
  <img :src="$props.src" class="h-full w-full" :class="failed && 'hidden'" @error="failed = true" />
</template>

<style scoped></style>
