import { Model, Types } from 'mongoose'

export type IBooking = {
  _id: Types.ObjectId
  title: string
  description: string
  customerName: string
  movieName: string
  ticketType: string
  seatNumber: Number
  showTime: Date
  purchesTicket: Number
  payementStatus: string
  payementType: string
  user: Types.ObjectId
  date: Date
  createdAt: Date
  updatedAt: Date
}

export type IBookingModel = Model<IBooking>
