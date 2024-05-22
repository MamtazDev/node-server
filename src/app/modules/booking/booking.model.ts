import { Schema, model } from 'mongoose'
import mongooseNullError from 'mongoose-null-error'
import { IBooking, IBookingModel } from './booking.interface'

const schema = new Schema<IBooking, IBookingModel>(
  {
    title: { type: String, required: true, trim: true },
    date: { type: Date, required: true, trim: true },


    description: { type: String, required: true, trim: true },
    user: { type: Schema.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

schema.plugin(mongooseNullError)

export const Blog = model<IBooking, IBookingModel>('Booking', schema)
