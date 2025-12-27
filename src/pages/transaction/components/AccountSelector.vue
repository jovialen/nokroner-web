<script setup lang="ts">
import { type Account } from "@/api/schemas"
import { useAccountsStore } from "@/stores/accounts";
import { formatMoney } from "@/utils/format";

const model = defineModel()

defineProps({
  options: Array<Account>
})

const accounts = useAccountsStore()
</script>

<template>
  <div class="border-2 border-border rounded-lg p-6 space-y-4">
    <div class="flex flex-col gap-2 items-center">
      <label for="from_account">{{ $t('schema.transaction.from_account') }}</label>
      <select name="from_account" id="from_account" v-model="model"
        class="bg-muted text-muted-foreground rounded-lg px-4 py-2 border border-border">
        <option v-for="account in options" :value="account.id" :key="account.name">
          {{ account.name }}
        </option>
      </select>
    </div>
    <p class="text-center">{{ formatMoney(modelValue ? accounts.getAccount(modelValue)?.balance : 0) }} NOK</p>
  </div>
</template>

<style scoped></style>
