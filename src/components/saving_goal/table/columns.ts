import type { Column } from '@/components/table'
import { formatMoney } from '@/utils/format'
import { EllipsisVerticalIcon } from 'lucide-vue-next'
import { h } from 'vue'
import { useI18n } from 'vue-i18n'

export const savingGoalsColumns: Column[] = [
  {
    name: 'date',
    accessor: 'created_at',
    i18n: 'schema.saving_goal.date',
    transformer: (date) => {
      const { d } = useI18n({ useScope: 'global' })
      return d(date as Date)
    },
  },
  {
    name: 'name',
    i18n: 'schema.saving_goal.name',
  },
  {
    name: 'amount',
    i18n: 'schema.saving_goal.amount',
    transformer: (value) => formatMoney(value as number),
  },
  {
    name: 'saved',
    i18n: 'schema.saving_goal.saved',
    transformer: (value) => formatMoney(value as number),
  },
  {
    name: 'realized',
    i18n: 'schema.saving_goal.realized',
  },
  {
    name: 'archived',
    i18n: 'schema.saving_goal.archived',
    transformer: (value) => !!value,
  },
  {
    name: 'action',
    i18n: 'accessibility.table.actions',
    header: () => h('div'),
    cell: () => h(EllipsisVerticalIcon),
  },
]
