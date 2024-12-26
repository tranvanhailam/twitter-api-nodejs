import express from 'express'
import { usersRouter } from '~/routes/user.routes'
import { databaseService } from '~/services/database.services'
const app = express()
const port = 6000

app.use(express.json()) //App handler

app.use('/users', usersRouter) //Route handler

databaseService.connect()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
