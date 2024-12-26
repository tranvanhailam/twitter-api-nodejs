import { Router } from 'express'
import { loginValidator } from '~/middlewares/users.middlewares' //Nhập module
import { loginController } from '~/controllers/users.controllers'
const usersRouter = Router()

usersRouter.post('/login', loginValidator, loginController)

export { usersRouter }
