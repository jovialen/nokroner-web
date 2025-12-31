import { defineStore } from 'pinia'
import type { Account, Owner, Transaction } from '@/api/schemas'
import { useAuthStore } from './auth'
import { computed, ref, watch, watchEffect } from 'vue'
import api from '@/services/axios'
import { useOwnersStore } from './owners'

export const useAccountsStore = defineStore('accounts', () => {
  const auth = useAuthStore()
  const owners = useOwnersStore()

  const accounts = ref([] as Account[])

  const getAccountsOwnedBy = (owner: Owner | undefined) => {
    return accounts.value.filter((account) => account.owner_id === owner?.id)
  }

  const getAccount = (id: number) => {
    return accounts.value.find((account) => account.id === id)
  }

  const user_accounts = computed(() => getAccountsOwnedBy(owners.userOwner))

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

  return {
    accounts,
    user_accounts,
    getAccountsOwnedBy,
    getAccount,
    fetchAccounts,
  }
})

export const useTransactionsStore = defineStore('transactions', () => {
  const auth = useAuthStore()
  const accounts = useAccountsStore()
  const owners = useOwnersStore()

  const transactions = ref([] as Transaction[])

  const getTransactionsFrom = (account: Account | undefined) => {
    return transactions.value.filter(
      (transaction) => transaction.from_account_id === account?.id,
    )
  }

  const getTransactionsTo = (account: Account | undefined) => {
    return transactions.value.filter(
      (transaction) => transaction.to_account_id === account?.id,
    )
  }

  const getTransactions = (account: Account | undefined) => {
    return [
      ...getTransactionsTo(account),
      ...getTransactionsFrom(account),
    ].sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
  }

  const getOwnerTransactions = (owner: Owner | undefined) => {
    // Get all accounts owned by this owner
    const ownedAccounts = accounts.getAccountsOwnedBy(owner)

    // Get all transactions from any of those accounts
    let transactions = ownedAccounts.flatMap((account) =>
      getTransactions(account),
    )

    // Internal transactions appear twice, so filter for unique transactions
    transactions = transactions.filter(
      (transaction, i) =>
        transactions.findIndex((t) => t.id === transaction.id) === i,
    )

    // Sort by creation date
    transactions.sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
    return transactions
  }

  const fetchTransactions = async () => {
    if (auth.isAuthenticated) {
      const response = await api.get('/transactions')
      transactions.value = response.data ?? []
    } else {
      transactions.value = []
    }
  }

  watchEffect(() => {
    if (auth.isAuthenticated) {
      fetchTransactions()
    }
  })

  const userTransactions = ref(getOwnerTransactions(owners.userOwner))
  watch(
    [() => owners.userOwner, transactions],
    () => (userTransactions.value = getOwnerTransactions(owners.userOwner)),
  )

  return {
    transactions,
    userTransactions,
    getTransactionsFrom,
    getTransactionsTo,
    getTransactions,
    getOwnerTransactions,
    fetchAccounts: fetchTransactions,
  }
})
