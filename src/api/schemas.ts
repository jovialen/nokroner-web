export type DatabaseModel = { id: number; created_at: Date; updated_at: Date }

export type AccountInfo = {
  name: string
  account_number: string
  balance: number
  interest: number
  owner_id: number
}

export type Account = DatabaseModel & AccountInfo

export type UserInfo = {
  first_name: string
  last_name: string
  email_address: string
}

export type User = DatabaseModel & UserInfo

export type OwnerInfo = {
  name: string
  net_worth: number
  is_user: boolean
  user_id: number
}

export type DetailedOwnerInfo = OwnerInfo & {
  net_worth_last_month: number
  recent_income: number
  recent_expenses: number
  previous_income: number
  previous_expenses: number
}

export type Owner = DatabaseModel & OwnerInfo
export type DetailedOwner = DatabaseModel & DetailedOwnerInfo

export type TransactionInfo = {
  name: string
  amount: number
  from_account_id: number
  to_account_id: number
  transaction_date: Date
}

export type Transaction = DatabaseModel & TransactionInfo
