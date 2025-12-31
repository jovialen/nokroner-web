<script setup lang="ts">
import BackButton from '@/components/button/BackButton.vue'
import TransactionCreationForm from '@/components/transactions/TransactionCreationForm.vue'
</script>

<template>
  <div class="flex items-center gap-4">
    <BackButton />
    <h1 class="text-xl">{{ $t('page.create_transaction.title') }}</h1>
  </div>

  <TransactionCreationForm @created="$router.back()" />
</template>

<style scoped></style>
