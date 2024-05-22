import { string, z } from 'zod'
import { xObjectId, xPassword, xRole } from '../../../global/constant'

const queryOperation = z.object({
  query: z.object({})
})

const getOperation = z.object({
  params: z.object({
    id: string().regex(xObjectId)
  }),
  query: z.object({})
})

const updateOperation = z.object({
  params: z.object({
    id: string().regex(xObjectId)
  }),
  body: z.strictObject({
    name: z.string().optional(),
    email: z.string().email().optional(),
    role: z.enum(xRole as [string]).optional(),
    password: z.string().regex(xPassword).optional()
  })
})

const deleteOperation = z.object({
  params: z.object({
    id: string().regex(xObjectId)
  })
})

export const UserZod = {
  queryOperation,
  getOperation,
  updateOperation,
  deleteOperation
}
