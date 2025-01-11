import { databaseService } from './database.services'
import User from '~/models/schemas/User.schema'

class UsersService {
  async register(payload: { email: string; password: string }) {
    const { email, password } = payload
    const result = await databaseService.users.insertOne(
      //.insertOne: Là một phương thức của MongoDB dùng để chèn một tài liệu mới vào collection.
      new User({
        email,
        password
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
