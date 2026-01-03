import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { ref, watchEffect } from 'vue'
import type { SavingGoal } from '@/api/schemas'
import api from '@/services/axios'

export const useSavingGoalsStore = defineStore('accounts', () => {
  const auth = useAuthStore()

  const savingGoals = ref([] as SavingGoal[])

  const fetchSavingGoals = async () => {
    if (auth.isAuthenticated) {
      const response = await api.get('/saving_goals')
      savingGoals.value = response.data ?? []
    } else {
      savingGoals.value = []
    }
  }

  watchEffect(() => {
    if (auth.isAuthenticated) {
      fetchSavingGoals()
    }
  })

  return {
    savingGoals,
    fetchSavingGoals,
  }
})
