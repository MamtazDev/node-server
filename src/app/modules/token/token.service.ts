import { TCreate, TGet, TUpdate } from '../../../global/types'
import { IToken as IType } from './token.interface'
import { Token as Model } from './token.model'

const createOperation: TCreate<IType> = async data => {
  const result = await Model.create(data)

  return { data: result }
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

export const TokenService = {
  createOperation,
  getOperation,
  updateOperation
}
