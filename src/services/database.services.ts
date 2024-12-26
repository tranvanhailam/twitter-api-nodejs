import { MongoClient, ServerApiVersion } from 'mongodb'
import { config } from 'dotenv'
config()
console.log()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitter.acfsm.mongodb.net/?retryWrites=true&w=majority&appName=Twitter`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// Tạo một MongoClient với đối tượng MongoClientOptions để thiết lập phiên bản API ổn định
// const client = new MongoClient(uri)

class DatabaseService {
  private client: MongoClient

  constructor() {
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    // Tạo một MongoClient với đối tượng MongoClientOptions để thiết lập phiên bản API ổn định
    this.client = new MongoClient(uri)
  }

  async connect() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      //Kết nối node js đến mongo atlas
      // await client.connect()
      // Send a ping to confirm a successful connection
      // Gửi tín hiệu mongo atlasatlas
      await this.client.db('admin').command({ ping: 1 })
      //Gửi thành côngcông
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } finally {
      // Ensures that the client will close when you finish/error
      //Đảm bảo rằng máy khách sẽ đóng khi bạn hoàn thành/lỗi
      await this.client.close()
    }
  }
}

//Tạo object từ class DatabaseService
export const databaseService = new DatabaseService()

// export async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     //Kết nối node js đến mongo atlas
//     // await client.connect()
//     // Send a ping to confirm a successful connection
//     // Gửi tín hiệu mongo atlasatlas
//     await client.db('admin').command({ ping: 1 })
//     //Gửi thành côngcông
//     console.log('Pinged your deployment. You successfully connected to MongoDB!')
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close()
//   }
// }
// run().catch(console.dir)
