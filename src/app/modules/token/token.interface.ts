import { Model, Types } from 'mongoose'
import { TTokenType } from '../../../global/types'

export type IToken = {
  _id: Types.ObjectId
  otp: number
  token: string
  token_type: TTokenType
  expires: Date
  user: Types.ObjectId
  blacklisted: boolean
  createdAt: Date
  updatedAt: Date
}

export type ITokenModel = Model<IToken>
