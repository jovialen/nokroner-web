import { defineStore } from 'pinia'
import { useAuthStore, useUserStore } from './auth'
import { computed, ref, watchEffect } from 'vue'
import { type Owner } from '@/api/schemas'
import api from '@/services/axios'

export const useOwnersStore = defineStore('owners', () => {
  const auth = useAuthStore()
  const user = useUserStore()

  const owners = ref<Owner[]>([])

  const fetchOwners = async () => {
    if (auth.isAuthenticated) {
      const response = await api.get('/owners')
      owners.value = response.data ?? []
    } else {
      owners.value = []
    }
  }

  const user_owner = computed(() =>
    owners.value.find((owner) => owner.user_id === user.user?.id),
  )

  watchEffect(() => {
    if (auth.isAuthenticated) {
      fetchOwners()
    }
  })

  return { owners, user_owner, fetchOwners }
})
