export type DatabaseModel = { id: number; created_at: Date; updated_at: Date }

export type Account = DatabaseModel & {
  name: string
  account_number: string
  balance: number
  interest: number
  owner_id: number
}

export type User = DatabaseModel & {
  first_name: string
  last_name: string
  email_address: string
}

export type Owner = DatabaseModel & {
  name: string
  net_worth: number
  is_user: boolean
  user_id: number
}
