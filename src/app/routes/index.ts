import express from 'express'
import { AuthRoute } from '../modules/auth/auth.route'
import { BlogRoute } from '../modules/blog/blog.route'
import { UserRoute } from '../modules/user/user.route'

const AppRouter = express.Router()

AppRouter.use('/api/v1/auth', AuthRoute)
AppRouter.use('/api/v1/users', UserRoute)
AppRouter.use('/api/v1/blogs', BlogRoute)

export default AppRouter