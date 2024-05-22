import { Model, Types } from 'mongoose'

export type IBlog = {
  _id: Types.ObjectId
  title: string
  description: string
  user: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export type IBlogModel = Model<IBlog>
