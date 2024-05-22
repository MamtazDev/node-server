import { TCreate, TDelete, TGet, TQuery, TUpdate } from '../../../global/types'
import { paginationMaker } from '../../../shared'
import { IBlog as IType } from './blog.interface'
import { Blog as Model } from './blog.model'

const createOperation: TCreate<IType> = async data => {
  const result = await Model.create(data)

  return { data: result }
}

const queryOperation: TQuery<IType> = async (query, user) => {
  console.log(query, user)

  const result = await Model.find({}, '', {})

  return {
    data: result,
    pagination: paginationMaker(1, 10, 100)
  }
}

const getOperation: TGet<IType> = async id => {
  const result = await Model.findById(id, '', {
    mongooseNullError: true
  })

  return { data: result }
}

const updateOperation: TUpdate<IType> = async (id, payload) => {
  const result = await Model.findByIdAndUpdate(id, payload, {
    mongooseNullError: true,
    runValidators: true,
    new: true
  })

  return { data: result }
}

const deleteOperation: TDelete<IType> = async id => {
  const result = await Model.findByIdAndDelete(id, {
    mongooseNullError: true
  })

  return { data: result }
}

export const BlogService = {
  createOperation,
  queryOperation,
  getOperation,
  updateOperation,
  deleteOperation
}
