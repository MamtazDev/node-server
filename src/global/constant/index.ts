import { TRole, TTokenType } from '../types'

export const xRole: TRole[] = ['admin', 'subscriber']

export const xTokenType: TTokenType[] = ['verify_number', 'verify_email', 'forgot_password']

export const xObjectId: RegExp = /^[0-9a-f]{24}$/

export const xPassword: RegExp = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/
