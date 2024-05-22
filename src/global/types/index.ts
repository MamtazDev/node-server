import { JwtPayload } from 'jsonwebtoken'

export type TRole = 'admin' | 'subscriber'

export type TTokenType = 'verify_number' | 'verify_email' | 'forgot_password'

export type TJwtUser =
  | (JwtPayload & {
      _id: string
      email: string
      role: TRole
    })
  | null

export type TPagination = {
  current: number
  total: number
  next: number | null
  prev: number | null
  records: number
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TReqQuery = Record<string, any>

export type TCreate<T> = (data: T) => Promise<{
  data: Partial<T> | null
}>

export type TQuery<T> = (
  query: TReqQuery,
  user: TJwtUser
) => Promise<{
  data: Partial<T>[] | null
  pagination: TPagination
}>

export type TGet<T> = (id: string) => Promise<{
  data: Partial<T> | null
}>

export type TUpdate<T> = (
  id: string,
  data: Partial<T>
) => Promise<{
  data: Partial<T> | null
}>

export type TDelete<T> = (id: string) => Promise<{
  data: Partial<T> | null
}>
