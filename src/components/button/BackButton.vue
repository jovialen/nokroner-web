<script setup lang="ts">
import { ArrowLeftIcon } from 'lucide-vue-next'
import IconButton from './IconButton.vue'
</script>

<template>
  <IconButton @click="$router.back()">
    <ArrowLeftIcon />
    <span class="sr-only">{{ $t('navigation.back') }}</span>
  </IconButton>
</template>
