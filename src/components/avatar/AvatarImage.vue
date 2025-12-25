<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'

const emit = defineEmits(['loaded'])

defineProps({
  src: {
    type: String,
    required: true,
  },
})

const pImg: Ref<HTMLImageElement | null> = ref(null)

watch(
  () => pImg.value?.complete,
  () => {
    if (pImg.value?.complete ?? false) {
      emit('loaded')
    }
  },
)

const loadError = () => {
  if (pImg.value) {
    pImg.value.style.display = 'none'
  }
}
</script>

<template>
  <img
    :src="$props.src"
    class="h-full w-full"
    @error="loadError()"
    ref="pImg"
  />
</template>

<style scoped></style>
