import { Router } from 'express'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares' //Nhập module
import { loginController, registerController } from '~/controllers/users.controllers'
const usersRouter = Router()

usersRouter.post('/login', loginValidator, loginController)

/**
 *
 * Desc: Register a new user
 * Path: /register
 * Method: POST
 * Body: {name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601}
 *
 */

usersRouter.post('/register', registerValidator, registerController)

export { usersRouter }
