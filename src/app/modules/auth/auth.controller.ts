import asyncHandler from 'express-async-handler'
import { apiResponse } from '../../../shared'
import { IUser as IType } from '../user/user.interface'
import { User } from '../user/user.model'
import { AuthService as service } from './auth.service'

const registration = asyncHandler(async (req, res) => {
  const { data } = await service.registration(req.body)

  apiResponse<Partial<IType>>(res, {
    message: `${User.modelName} registration successfully.`,
    data
  })
})

const login = asyncHandler(async (req, res) => {
  const { data } = await service.login(req.body)

  apiResponse<Partial<IType>>(res, {
    message: `${User.modelName} login successfully.`,
    data
  })
})

const resetPassword = asyncHandler(async (req, res) => {
  const { data } = await service.resetPassword(req.body)

  apiResponse<Partial<IType>>(res, {
    message: `${User.modelName} password reset successfully.`,
    data
  })
})

export const AuthController = {
  registration,
  login,
  resetPassword
}
