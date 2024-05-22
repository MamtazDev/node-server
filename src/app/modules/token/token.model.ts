import { Schema, model } from 'mongoose'
import { xTokenType } from '../../../global/constant'
import { IToken, ITokenModel } from './token.interface'

const schema = new Schema<IToken, ITokenModel>(
  {
    otp: { type: Number, required: true },
    token: { type: String, required: true, trim: true },
    token_type: { type: String, enum: xTokenType, required: true },
    expires: { type: Date, required: true },
    user: { type: Schema.ObjectId, ref: 'User', required: true },
    blacklisted: { type: Boolean, required: true, default: false }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export const Token = model<IToken, ITokenModel>('Token', schema)
