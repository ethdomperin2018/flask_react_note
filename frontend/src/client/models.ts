export type Body_login_login_access_token = {
  grant_type?: string | null
  username: string
  password: string
  scope?: string
  client_id?: string | null
  client_secret?: string | null
}

export type Card = {
  front: string
  back: string
  id: string
  collection_id: string
}

export type CardCreate = {
  front: string
  back: string
}

export type CardList = {
  data: Array<Card>
  count: number
}

export type Collection = {
  name: string
  description?: string | null
  id: string
  user_id: string
  cards: Array<Card>
}

export type CollectionCreate = {
  name: string
  description?: string | null
}

export type CollectionList = {
  data: Array<Collection>
  count: number
}

export type CollectionUpdate = {
  name?: string | null
  description?: string | null
}

export type HTTPValidationError = {
  detail?: Array<ValidationError>
}

export type Token = {
  access_token: string
  token_type?: string
}

export type UserPublic = {
  email: string
  is_active?: boolean
  is_superuser?: boolean
  full_name?: string | null
  id: string
}

export type UserRegister = {
  email: string
  password: string
  full_name?: string | null
}

export type ValidationError = {
  loc: Array<string | number>
  msg: string
  type: string
}
