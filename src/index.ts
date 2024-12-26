import express from 'express'
import { usersRouter } from './routes/user.routes'
const app = express()
const port = 6000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(express.json()) //App handler

app.use('/users', usersRouter) //Route handler
