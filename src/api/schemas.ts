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

export type Owner = DatabaseModel & OwnerInfo
