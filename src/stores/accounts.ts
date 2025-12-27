import { defineStore } from 'pinia'
import type { Account, Owner } from '@/api/schemas'
import { useAuthStore } from './auth'
import { computed, ref, watchEffect } from 'vue'
import api from '@/services/axios'
import { useOwnersStore } from './owners'

export const useAccountsStore = defineStore('accounts', () => {
  const auth = useAuthStore()
  const owners = useOwnersStore()

  const accounts = ref([] as Account[])

  const getAccountsOwnedBy = (owner: Owner | undefined) => {
    return accounts.value.filter((account) => account.owner_id === owner?.id)
  }

  const user_accounts = computed(() => getAccountsOwnedBy(owners.user_owner))

  const fetchAccounts = async () => {
    if (auth.isAuthenticated) {
      const response = await api.get('/accounts')
      accounts.value = response.data ?? []
    } else {
      accounts.value = []
    }
  }

  watchEffect(() => {
    if (auth.isAuthenticated) {
      fetchAccounts()
    }
  })

  return { accounts, user_accounts, getAccountsOwnedBy, fetchAccounts }
})
