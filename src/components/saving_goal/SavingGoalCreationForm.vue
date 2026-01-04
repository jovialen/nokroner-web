<script setup lang="ts">
import type { SavingGoalInfo } from '@/api/schemas'
import api from '@/services/axios'
import { useSavingGoalsStore } from '@/stores/saving_goals'
import { ref } from 'vue'

const emit = defineEmits(["submit", "created", "error"])

const savingGoals = useSavingGoalsStore()

const savingGoal = ref<SavingGoalInfo>({
  name: '',
  amount: 0,
  realized: false,
  archived: false,
})
const submitting = ref(false)

const submit = async () => {
  submitting.value = true
  emit("submit", savingGoal.value)

  try {
    const response = await api.post('/saving_goals', savingGoal.value)
    await savingGoals.fetchSavingGoals()
    emit("created", response.data)
  } catch (err) {
    emit("error", err)
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <form @submit.stop.prevent="submit()" class="space-y-4">
    <div class="flex flex-col gap-2">
      <label for="name">{{ $t("schema.saving_goal.name") }}</label>
      <input type="text" name="name" id="name"
        class="px-4 py-2 border border-border rounded-lg bg-muted text-muted-foreground"
        :placeholder="$t('page.create_saving_goal.placeholder.name')" v-model="savingGoal.name">
    </div>

    <div class="flex flex-col gap-2">
      <label for="amount">{{ $t("schema.saving_goal.amount") }}</label>
      <input type="number" name="amount" id="amount"
        class="px-4 py-2 border border-border rounded-lg bg-muted text-muted-foreground" v-model="savingGoal.amount">
    </div>

    <button type="submit">{{ $t("page.create_saving_goal.submit") }}</button>
  </form>
</template>

<style scoped></style>
