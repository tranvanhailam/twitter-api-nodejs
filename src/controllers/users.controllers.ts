import { Request, Response } from 'express'

export const loginController = (req: Request, res: Response) => { //Xuất module - Có thể tương tác với service
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
