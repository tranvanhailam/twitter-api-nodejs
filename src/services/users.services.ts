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
}

const usersService = new UsersService()
export default usersService
