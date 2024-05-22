import httpStatus from 'http-status'
import config from '../../../config'
import { ApiError, generateOTP } from '../../../shared'
import { Token } from '../token/token.model'
import { IUser as IType } from '../user/user.interface'
import { User as Model } from '../user/user.model'

const registration = async (data: IType) => {
  const result = await Model.create(data)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userinfo } = result.toObject()

  return { data: userinfo }
}

const login = async (data: Pick<IType, 'email' | 'password'>) => {
  // get user information
  const result = await Model.findOne({ email: data.email }).select('+password')

  if (!result) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access')
  }

  // password verification
  const isPasswordValid = await Model.checkPassword(data.password, result.password)

  if (!isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, createdAt, updatedAt, ...userinfo } = result.toObject()

  // generate tokens
  const tokenData = { _id: userinfo._id, role: userinfo.role }
  const accessToken = Model.createToken(tokenData, config.jwt.secret!, config.jwt.expiresIn!)
  const refreshToken = Model.createToken(tokenData, config.jwt.secret!, config.jwt.expiresIn!)

  const payload = {
    ...userinfo,
    access_token: accessToken,
    refresh_token: refreshToken
  }

  return { data: payload }
}

const resetPassword = async ({
  _id,
  password,
  new_password
}: {
  _id: string
  password: string
  new_password: string
  confirm_new_password: string
}) => {
  const result = await Model.findOne({ _id }).select('+password')

  if (!result) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access')
  }

  // password verification
  const isPasswordValid = await Model.checkPassword(password, result.password)

  if (!isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password incorrect')
  }

  const updatePassword = await Model.findByIdAndUpdate(_id, { password: new_password })

  if (!updatePassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password update failed')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: dbPassword, ...userinfo } = updatePassword.toObject()

  return { data: userinfo }
}

const forgotPassword = async ({ email }: { email: string }) => {
  console.log(email)

  const result = await Token.create({
    otp: generateOTP(),
    token: '',
    token_type: 'forgot_password',
    expires: new Date(),
    user: '',
    blacklisted: false
  })

  console.log(result)
}

export const AuthService = {
  registration,
  login,
  resetPassword,
  forgotPassword
}
