<script setup lang="ts">
import { useAccountsStore } from '@/stores/accounts';

const accounts = useAccountsStore();
</script>

<template>
  <h1 class="text-xl">{{ $t("page.accounts.my_accounts") }}</h1>

  <ul :aria-label="$t('accessibility.accounts.list')" tabindex="0">
    <li v-for="account in accounts.user_accounts" :key="account.name" :aria-label="account.name" tabindex="0">
      {{ account.name }}
    </li>
  </ul>
</template>

<style scoped></style>
