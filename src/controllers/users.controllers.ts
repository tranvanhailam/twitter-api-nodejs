import { Request, Response } from 'express'
import { databaseService } from '~/services/database.services'
import User from '~/models/schemas/User.schema'
import usersService from '~/services/users.services'

//Xuất module - Có thể tương tác với service
export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'hailamtranvan@gmail.com' && password === '26102004') {
    res.status(200).json({
      message: 'Login success'
    })
  } else {
    res.status(400).json({
      error: 'Login failed'
    })
  }
}

export const registerController = async (req: Request, res: Response) => {
  //Xuất module - Có thể tương tác với service
  const { email, password } = req.body

  try {
    const result = await usersService.register({ email, password })

    console.log(result)

    res.json({
      message: 'Register success',
      result
    })
  } catch (error) {
    console.log(error)

    res.status(400).json({
      error: 'Register failed: ' + error
    })
  }
}
