import { z } from 'zod'
import { xPassword, xRole } from '../../../global/constant'

const registration = z.object({
  body: z
    .strictObject({
      name: z.string(),
      email: z.string().email(),
      role: z.enum(xRole as [string]),
      password: z.string().regex(xPassword),
      confirm_password: z.string().regex(xPassword),
      send_otp: z.boolean(),
      token_type: z.enum(['d']).optional()
    })
    .refine(data => data.password === data.confirm_password, {
      message: "Passwords don't match",
      path: ['confirm_password']
    })
    .refine(data => data.send_otp && data.token_type, {
      message: 'Token type is required when send OTP is true',
      path: ['token_type']
    })
})

const login = z.object({
  body: z.strictObject({
    email: z.string().email(),
    password: z.string().regex(xPassword)
  })
})

const resetPassword = z.object({
  body: z
    .strictObject({
      token: z.string().optional(),
      password: z.string().regex(xPassword),
      new_password: z.string().regex(xPassword),
      confirm_new_password: z.string().regex(xPassword)
    })
    .refine(data => data.new_password === data.confirm_new_password, {
      message: "Confirm passwords don't match",
      path: ['confirm_new_password']
    })
})

const forgotPassword = z.object({
  body: z.strictObject({
    email: z.string().email()
  })
})

export const AuthZod = {
  registration,
  login,
  resetPassword,
  forgotPassword
}
