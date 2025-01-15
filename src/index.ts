import express, { Request, Response, NextFunction } from 'express'
import { usersRouter } from '~/routes/user.routes'
import { databaseService } from '~/services/database.services'
const app = express()
const port = 3000

app.use(express.json()) //App handler

app.use('/users', usersRouter) //Route handler user

databaseService.connect()

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ message: 'Register error' })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
