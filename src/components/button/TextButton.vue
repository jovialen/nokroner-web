<script setup lang="ts">
defineEmits(["click"])

defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value) => ["primary", "secondary", "accent"].includes(value as string)
  },
  hoverVariant: String
})

const VARIANTS: { [key: string]: string } = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  accent: "bg-accent text-accent-foreground",
  destructive: "bg-destructive text-white",
}

const HOVER_VARIANTS: { [key: string]: string } = {
  primary: "hover:bg-primary/90 hover:text-primary-foreground",
  secondary: "hover:bg-secondary/90 hover:text-secondary-foreground",
  accent: "hover:bg-accent/90 hover:text-accent-foreground",
  destructive: "hover:bg-destructive/90 hover:text-white"
}
</script>

<template>
  <button class="rounded-lg text-base transition px-4 py-1"
    :class="[VARIANTS[variant], HOVER_VARIANTS[hoverVariant ?? variant]].join(' ')" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<style scoped></style>
