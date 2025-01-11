import express from 'express'
import { body, validationResult, ContextRunner, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'

// can be reused by many routes
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await validation.run(req) // Check lỗi và đưa lỗi vào trong biến req

    const result = validationResult(req) //Lấy ra lỗi
    if (result.isEmpty()) {
      return next()
    }
    res.status(400).json({ error: result.mapped() })
  }
}
