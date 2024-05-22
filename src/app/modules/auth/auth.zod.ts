import { z } from 'zod'
import { xObjectId, xPassword, xRole } from '../../../global/constant'

const registration = z.object({
  body: z
    .strictObject({
      name: z.string(),
      email: z.string().email(),
      role: z.enum(xRole as [string]),
      password: z.string().regex(xPassword),
      confirm_password: z.string().regex(xPassword)
    })
    .refine(data => data.password === data.confirm_password, {
      message: "Passwords don't match",
      path: ['confirm_password']
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
      _id: z.string().regex(xObjectId),
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
