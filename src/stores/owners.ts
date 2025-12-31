import { defineStore } from 'pinia'
import { useAuthStore, useUserStore } from './auth'
import { computed, ref, watchEffect } from 'vue'
import { type DetailedOwner, type Owner } from '@/api/schemas'
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

  const userOwner = computed(() =>
    owners.value.find((owner) => owner.user_id === user.user?.id),
  )

  watchEffect(() => {
    if (auth.isAuthenticated) {
      fetchOwners()
    }
  })

  return { all: owners, userOwner, fetchOwners }
})

export const useUserOwnerStore = defineStore('userOwner', () => {
  const owners = useOwnersStore()

  const userOwner = ref<DetailedOwner | undefined>()

  const fetchUserOwner = async () => {
    if (owners.userOwner?.id) {
      const response = await api.get(`/owners/${owners.userOwner.id}`)
      userOwner.value = response.data
    } else {
      userOwner.value = undefined
    }
  }

  watchEffect(() => {
    if (owners.userOwner) {
      fetchUserOwner()
    }
  })

  return { userOwner, fetchUserOwner }
})
