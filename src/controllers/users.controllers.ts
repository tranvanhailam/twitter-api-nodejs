import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core' //  được sử dụng để biểu diễn các tham số (params) được trích xuất từ URL khi sử dụng các route động trong Express.
import usersService from '~/services/users.services'
import { RegisterReqBody } from '~/models/requests/User.requests'

//Xuất module - Có thể tương tác với service
export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const exists = await usersService.login({ email, password })
  if (exists) {
    res.status(200).json({
      message: 'Login success'
    })
  } else {
    res.status(400).json({
      error: 'Login failed'
    })
  }
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  //ParamsDictionary: Kiểu dữ liệu của các tham số URL.
  // any: Kiểu dữ liệu cho response trả về từ controller.
  // RegisterReqBody: Kiểu dữ liệu của req.body
  //Xuất module - Có thể tương tác với service
  try {
    const result = await usersService.register(req.body) // Gọi đến service để xử lý

    console.log(result)

    res.status(200).json({
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
