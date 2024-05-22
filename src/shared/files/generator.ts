import crypto from 'crypto'

export const generateOTP = (): number => {
  const min = 100000
  const max = 999999

  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const generateToken = (): string => {
  return crypto.randomBytes(32).toString('hex')
}

export const generateHashToken = (token: string): string => {
  return crypto.createHash('sha256').update(token).digest('hex')
}
