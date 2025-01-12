import { RegisterReqBody } from '~/models/requests/User.requests'
import { databaseService } from './database.services'
import User from '~/models/schemas/User.schema'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { TokenType } from '~/constants/enums'

class UsersService {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken
      },
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN// 15m
      }
    })
  }

  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken
      },
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN//100d
      }
    })
  }

  async register(payload: RegisterReqBody) {
    const result = await databaseService.users.insertOne(
      // result trả về ID : Object sau khi thêm vào csdl
      //.insertOne: Là một phương thức của MongoDB dùng để chèn một tài liệu mới vào collection.
      new User({
        ...payload, //sao chép tất cả các thuộc tính của đối tượng payload và đưa chúng vào một đối tượng mới.
        date_of_birth: new Date(payload.date_of_birth), // convert string => date//Ghi đè (hoặc thêm) thuộc tính date_of_birth bằng giá trị new Date(payload.date_of_birth).
        password: hashPassword(payload.password) // Hash password
      })
    )
    const user_id = result.insertedId.toString()
    const [access_token, refresh_token] = await Promise.all([
      // thực thi đồng thời hai hàm bất đồng bộ this.signAccessToken và this.signRefreshToken, sau đó gán kết quả trả về của chúng cho hai biến access_token và refresh_token.
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ])
    return {
      access_token,
      refresh_token
    }
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
    return Boolean(user)
  }
}

const usersService = new UsersService()
export default usersService
