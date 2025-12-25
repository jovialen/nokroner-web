<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  show: Boolean,
})

const names = props.text.split(' ')
const first = names[0]
const last = names[names.length - 1]

let initials
if (first === undefined) {
  initials = 'NaN'
} else if (first === last) {
  initials = first.substring(0, 2)
} else {
  initials = first.charAt(0) + last!.charAt(0)
}
</script>

<template>
  <span
    :class="($props.show ?? true) ? '' : 'hidden'"
    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-white text-lg"
  >
    {{ initials }}
  </span>
</template>

<style scoped></style>
