import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Schema, model } from 'mongoose'
import mongooseNullError from 'mongoose-null-error'
import config from '../../../config'
import { xRole } from '../../../global/constant'
import { IUser, IUserModel } from './user.interface'

const schema = new Schema<IUser, IUserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, required: true, enum: xRole }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

schema.plugin(mongooseNullError)

schema.statics.hashGenerator = async password => {
  return await bcrypt.hash(password, Number(config.soltRounds))
}

schema.statics.checkPassword = async (givenPassword, savedPassword) => {
  return await bcrypt.compare(givenPassword, savedPassword)
}

schema.statics.createToken = (payload, secret, expireTime) => {
  return jwt.sign(payload, secret, { expiresIn: expireTime })
}

schema.statics.verifyToken = (token, secret) => {
  return jwt.verify(token, secret) as JwtPayload
}

schema.pre('save', async function () {
  this.password = await User.hashGenerator(this.password)
})

schema.pre('updateOne', async function () {
  const user = <Partial<IUser>>this.getUpdate()

  if (user?.password) {
    user.password = await User.hashGenerator(user.password)
  }
})

export const User = model<IUser, IUserModel>('User', schema)
