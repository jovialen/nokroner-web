import type { Column } from '@/components/table'
import { useAccountsStore } from '@/stores/accounts'
import { EllipsisVerticalIcon } from 'lucide-vue-next'
import { h } from 'vue'
import { useI18n } from 'vue-i18n'

export const transactionColumns: Column[] = [
  {
    name: 'date',
    accessor: 'created_at',
    i18n: 'schema.transaction.date',
    transformer: (date) => {
      const { d } = useI18n({ useScope: 'global' })
      return d(date as Date)
    },
  },
  {
    name: 'name',
    i18n: 'schema.transaction.name',
  },
  {
    name: 'amount',
    i18n: 'schema.transaction.amount',
    transformer: (value) => `${value} NOK`,
  },
  {
    name: 'from_account_id',
    transformer: (account_id) => {
      const accounts = useAccountsStore()
      return accounts.getAccount(account_id as number)?.name
    },
    i18n: 'schema.transaction.from_account',
  },
  {
    name: 'to_account_id',
    transformer: (account_id) => {
      const accounts = useAccountsStore()
      return accounts.getAccount(account_id as number)?.name
    },
    i18n: 'schema.transaction.to_account',
  },
  {
    name: 'action',
    i18n: 'accessibility.table.actions',
    header: () => h('div'),
    cell: () => h(EllipsisVerticalIcon),
  },
]
