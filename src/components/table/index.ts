import type { Component } from 'vue'
import TableBody from './TableBody.vue'
import TableFooter from './TableFooter.vue'
import TableHeader from './TableHeader.vue'
import TableRoot from './TableRoot.vue'

export type FooterFunction<T> =
  | ((columnData: T[]) => unknown)
  | ((columnData: T[], columns: Column<unknown>[], data: object[]) => unknown)

export type Column<T = unknown> = {
  name: string
  i18n?: string | { key: string; props: Record<string, unknown> }
  header?: (() => Component) | ((cell: T) => Component)
  accessor?: string
  accessor_function?: (data: object) => T | undefined
  cell?: (() => Component) | ((cell: T) => Component)
  transformer?: (data: T) => unknown
} & (
  | {
      footer?: never
      footerFunction?: FooterFunction<T>
    }
  | {
      footer: (() => Component) | ((cell: unknown) => Component)
      footerFunction: FooterFunction<T>
    }
)

const getRawCellData = <T>(column: Column<T>, row: object): T | undefined => {
  if (column.accessor_function) {
    return column.accessor_function(row)
  } else {
    const accessor = column.accessor ?? column.name
    const entries = Object.entries(row)
    const entry = entries.find((value) => value[0] === accessor)
    return entry ? entry[1] : undefined
  }
}

export const getCellData = <T>(
  column: Column<T>,
  row: object,
): T | unknown | undefined => {
  const raw = getRawCellData(column, row)

  if (raw !== undefined && column.transformer !== undefined) {
    return column.transformer(raw)
  } else {
    return raw
  }
}

export const getColumnData = <T>(column: Column<T>, data: object[]): T[] => {
  return data?.map((row) => getCellData(column, row)) as T[]
}

export { TableRoot as Table, TableRoot, TableHeader, TableBody, TableFooter }
