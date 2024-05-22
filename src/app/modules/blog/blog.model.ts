import { Schema, model } from 'mongoose'
import mongooseNullError from 'mongoose-null-error'
import { IBlog, IBlogModel } from './blog.interface'

const schema = new Schema<IBlog, IBlogModel>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    user: { type: Schema.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

schema.plugin(mongooseNullError)

export const Blog = model<IBlog, IBlogModel>('Blog', schema)
