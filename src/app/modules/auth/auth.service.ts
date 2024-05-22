import httpStatus from 'http-status'
import config from '../../../config'
import { TJwtUser, TResetPassword } from '../../../global/types'
import { ApiError, generateExpire, generateHashToken, generateOTP, generateToken } from '../../../shared'
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

const resetPassword = async (data: TResetPassword, user: TJwtUser) => {
  if (data.token) {
    const result = await Token.findOne(
      { token: data.token, token_type: 'forgot_password', expires: { $gt: new Date() } },
      {},
      { populate: 'user' }
    )

    if (!result || (result && !result.user)) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access')
    }

    const updatePassword = await Model.findByIdAndUpdate(result.user._id, { password: data.new_password })

    if (!updatePassword) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password update failed')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: dbPassword, ...userinfo } = updatePassword.toObject()

    return { data: userinfo }
  }

  if (user) {
    const result = await Model.findOne({ _id: user._id }).select('+password')

    if (!result) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access')
    }

    // password verification
    const isPasswordValid = await Model.checkPassword(data.password, result.password)

    if (!isPasswordValid) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password incorrect')
    }

    const updatePassword = await Model.findByIdAndUpdate(user._id, { password: data.new_password })

    if (!updatePassword) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password update failed')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: dbPassword, ...userinfo } = updatePassword.toObject()

    return { data: userinfo }
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'Something is wrong')
}

const forgotPassword = async ({ email }: { email: string }) => {
  const user = await Model.findOne({ email }, { _id: 1 })

  if (!user) {
    return { data: { email } }
  }

  const token = generateToken()
  const hashedToken = generateHashToken(token)

  const result = await Token.create({
    otp: generateOTP(),
    token: hashedToken,
    token_type: 'forgot_password',
    expires: generateExpire(1),
    user: user._id,
    blacklisted: false
  })

  // Email send
  console.log(result)

  return { data: { email } }
}

export const AuthService = {
  registration,
  login,
  resetPassword,
  forgotPassword
}
