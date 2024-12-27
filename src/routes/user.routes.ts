import { Router } from 'express'
import { loginValidator } from '~/middlewares/users.middlewares' //Nhập module
import { loginController, registerController } from '~/controllers/users.controllers'
const usersRouter = Router()

usersRouter.post('/login', loginValidator, loginController)
usersRouter.post('/register', registerController)

export { usersRouter }
