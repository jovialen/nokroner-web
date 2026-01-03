<script setup lang="ts">
import BackButton from '@/components/button/BackButton.vue'
import SavingGoalCreationForm from '@/components/saving_goal/SavingGoalCreationForm.vue';
</script>

<template>
  <div class="flex items-center gap-4">
    <BackButton />
    <h1 class="text-xl">{{ $t('page.create_saving_goal.title') }}</h1>
  </div>

  <SavingGoalCreationForm @created="$router.back()" />
</template>

<style scoped></style>
