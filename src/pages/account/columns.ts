import PercentageBadge from '@/components/badge/PercentageBadge.vue'

import { getColumnData, type Column } from '@/components/table'
import { formatPercentage } from '@/utils/format'
import { EllipsisVerticalIcon } from 'lucide-vue-next'
import { h } from 'vue'
import { useI18n } from 'vue-i18n'

export const account_columns: Column[] = [
  {
    name: 'name',
    i18n: 'schema.account.name',
    footerFunction: () => ({}),
    footer: () => {
      const { t } = useI18n({ useScope: 'global' })
      return h('p', {}, t('page.accounts.table.total'))
    },
  },
  {
    name: 'account_number',
    i18n: 'schema.account.account_number',
  },
  {
    name: 'balance',
    i18n: 'schema.account.balance',
    cell: (value) => h('p', {}, `${value} NOK`),
    footerFunction: (columnData: unknown) =>
      (columnData as number[]).reduce((a, b) => a + b, 0),
  },
  {
    name: 'interest',
    i18n: 'schema.account.interest',
    cell: (data) => h('p', {}, formatPercentage((data as number) - 1, 1)),
    footerFunction: (interest, columns, rows) => {
      const balances = getColumnData(
        columns.find((column) => column.name === 'balance')!,
        rows,
      )! as number[]

      let total_balance = 0
      let total_interest = 0
      for (let i = 0; i < interest.length; i++) {
        total_balance += balances[i]!
        total_interest += balances[i]! * (interest as number[])[i]!
      }

      return total_interest / total_balance
    },
    footer: (data) => h('p', {}, formatPercentage((data as number) - 1, 1)),
  },
  {
    name: 'change_percent',
    i18n: {
      key: 'page.accounts.table.change',
      props: { period: '1D', unit: '%' },
    },
    cell: (data) => {
      return h(PercentageBadge, { percentage: data as number, baseline: 0 })
    },
    footerFunction: () => ({}),
    footer: () => h(PercentageBadge, { percentage: 1 }),
  },
  {
    name: 'change_actual',
    i18n: {
      key: 'page.accounts.table.change',
      props: { period: '1D', unit: 'NOK' },
    },
    cell: (value) => h('p', {}, `${value} NOK`),
    footerFunction: (columnData: unknown[]) =>
      (columnData as number[]).reduce((a, b) => a + b, 0),
    footer: (value) => h('p', {}, `${value} NOK`),
  },
  {
    name: 'trend_percent',
    i18n: {
      key: 'page.accounts.table.trend',
      props: { period: '1D', unit: '%' },
    },
    cell: (data) =>
      h(PercentageBadge, { percentage: data as number, baseline: 0 }),
    footerFunction: () => ({}),
    footer: () => h(PercentageBadge, { percentage: 1 }),
  },
  {
    name: 'trend_actual',
    i18n: {
      key: 'page.accounts.table.trend',
      props: { period: '1D', unit: 'NOK' },
    },
    cell: (value) => h('p', {}, `${value} NOK`),
    footerFunction: (columnData: unknown[]) =>
      (columnData as number[]).reduce((a, b) => a + b, 0),
    footer: (value) => h('p', {}, `${value} NOK`),
  },
  {
    name: 'action',
    i18n: 'accessibility.table.actions',
    header: () => h('div'),
    cell: () => h(EllipsisVerticalIcon),
  },
]
