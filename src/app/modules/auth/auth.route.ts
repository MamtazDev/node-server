import { Router } from 'express'
import { validateZod } from '../../middlewares'
import { AuthController as controller } from './auth.controller'
import { AuthZod as zod } from './auth.zod'

const router = Router()

router.post('/registration', validateZod(zod.registration), controller.registration)
router.post('/login', validateZod(zod.login), controller.login)
router.post('/reset-password', validateZod(zod.resetPassword), controller.resetPassword)

export const AuthRoute = router
