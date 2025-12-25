<script setup lang="ts">
import type { Account } from '@/api/schemas';
import StatBar from '@/components/card/StatBar.vue';
import api from '@/services/axios';
import { ref } from 'vue';

const my_accounts = ref<Account[]>([]);

api.get("/accounts").then((response) => {
  my_accounts.value = response.data ?? []
})
</script>

<template>
  <h1 class="text-xl">{{ $t("page.accounts.my_accounts") }}</h1>

  <StatBar>
    
  </StatBar>

  <ul :aria-label="$t('accessibility.accounts.list')" tabindex="0">
    <li v-for="account in my_accounts" :key="account.name" :aria-label="account.name" tabindex="0">
      {{ account.name }}
    </li>
  </ul>
</template>

<style scoped></style>
