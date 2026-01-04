<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

defineEmits(["click"])

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value) => ["primary", "secondary", "accent"].includes(value as string)
  },
  hoverVariant: String,
  to: String
})

const VARIANTS: { [key: string]: string } = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  accent: "bg-accent text-accent-foreground",
  destructive: "bg-destructive text-white",
  muted: "text-muted-foreground",
}

const HOVER_VARIANTS: { [key: string]: string } = {
  primary: "hover:bg-primary/90 hover:text-primary-foreground",
  secondary: "hover:bg-secondary/90 hover:text-secondary-foreground",
  accent: "hover:bg-accent/90 hover:text-accent-foreground",
  destructive: "hover:bg-destructive/90 hover:text-white",
  muted: "hover:bg-muted"
}

const classes = computed(() => [
  "cursor-pointer flex justify-center items-center rounded-lg text-base transition px-4 py-1",
  VARIANTS[props.variant],
  HOVER_VARIANTS[props.hoverVariant ?? props.variant]
].join(' '))
</script>

<template>
  <router-link v-if="to" :to="to" :class="classes">
    <slot></slot>
  </router-link>
  <button v-else :class="classes" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<style scoped></style>
