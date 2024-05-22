import { JwtPayload, Secret } from 'jsonwebtoken'
import { Model, Types } from 'mongoose'
import { TRole } from '../../../global/types'

export type IUser = {
  _id: Types.ObjectId
  name: string
  email: string
  number: string
  password: string
  role: TRole
  is_email_verified: boolean
  is_number_verified: boolean
  createdAt: Date
  updatedAt: Date
}

export type IUserModel = {
  hashGenerator(password: string): Promise<string>
  checkPassword(givenPassword: string, savedPassword: string): Promise<boolean>
  createToken(paylod: Record<string, unknown>, secret: string, expireTime: string): string
  verifyToken(token: string, secret: Secret): JwtPayload
} & Model<IUser>
