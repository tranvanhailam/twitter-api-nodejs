import { MongoClient, ServerApiVersion, Db, Collection } from 'mongodb'
import { config } from 'dotenv'
import User from '~/models/schemas/User.schema'

config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitter.acfsm.mongodb.net/?retryWrites=true&w=majority&appName=Twitter`

class DatabaseService {
  private client: MongoClient //MongoClient với đối tượng MongoClientOptions, đối tượng dùng để kết nối với MongoDB.
  private db: Db //đại diện cho cơ sở dữ liệu cụ thể bên trong MongoDB.

  constructor() {
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    // Tạo một MongoClient với đối tượng MongoClientOptions để thiết lập phiên bản API ổn định và gán vào client.
    this.client = new MongoClient(uri)

    //Lấy cơ sở dữ liệu (db)
    this.db = this.client.db(process.env.DB_NAME)
  }

  async connect() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      //Kết nối node js đến mongo atlas
      await this.client.connect()

      // Send a ping to confirm a successful connection
      // Gửi tín hiệu mongo atlasatlas, Gửi lệnh ping để xác nhận kết nối thành công
      await this.db.command({ ping: 1 })

      //Gửi thành công
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
      // } finally {
      // Ensures that the client will close when you finish/error
      //Đảm bảo rằng máy khách sẽ đóng khi hoàn thành/lỗi
      //await this.client.close()
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  get users(): Collection<User> {
    //Trả về collection users để thao tác dữ liệu người dùng.
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }
}

//Tạo object từ class DatabaseService
export const databaseService = new DatabaseService()
