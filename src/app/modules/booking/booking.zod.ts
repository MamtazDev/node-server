import { string, z } from 'zod'
import { xObjectId } from '../../../global/constant'

const createOperation = z.object({
  body: z.strictObject({
    title: z.string(),
    description: z.string(),
    user: z.string().regex(xObjectId)
  })
})

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
    title: z.string().optional(),
    description: z.string().optional(),
    user: z.string().regex(xObjectId).optional()
  })
})

const deleteOperation = z.object({
  params: z.object({
    id: string().regex(xObjectId)
  })
})

export const BlogZod = {
  createOperation,
  queryOperation,
  getOperation,
  updateOperation,
  deleteOperation
}
