import { RegisterReqBody } from '~/models/requests/User.requests'
import { databaseService } from './database.services'
import User from '~/models/schemas/User.schema'

class UsersService {
  async register(payload: RegisterReqBody) {
    const result = await databaseService.users.insertOne(
      //.insertOne: Là một phương thức của MongoDB dùng để chèn một tài liệu mới vào collection.
      new User({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth) // convert string => date
      })
    )
    return result
  }

  async login(payload: { email: string; password: string }) {
    const { email, password } = payload
    const exists = await databaseService.users.findOne({ email, password })
    if (!exists) {
      return false
    } else {
      return true
    }
  }

  async checkEmailExist(email: string) {
    const user = await databaseService.users.findOne({ email })
    console.log(user)

    return Boolean(user)
  }
}

const usersService = new UsersService()
export default usersService
