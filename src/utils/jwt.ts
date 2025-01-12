import jwt from 'jsonwebtoken' // thư viện jsonwebtoken để tạo một JSON Web Token (JWT).

export const signToken = ({
  payload, //Là dữ liệu sẽ được mã hóa và lưu trữ trong JWT
  privateKey = process.env.JWT_SECRET as string, // khóa bí mật (secret key) dùng để ký và mã hóa token.
  options = {
    algorithm: 'HS256'
  }
  //Là các tùy chọn cấu hình cho JWT, ví dụ:
  //expiresIn: Thời gian hết hạn của token (ví dụ: 1h, 7d).
  //algorithm: Thuật toán mã hóa, như HS256 (mặc định).
  // Nếu expireIn là số thì tính theo giây
  // Nếu expireIn là chuỗi phải quy định thêm các ký tự như 'm','h','d','w', nếu ko thêm các kí tự thì tính theo milisecond
}: {
  payload: string | Buffer | object
  privateKey?: string
  options?: jwt.SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (error, token) => {
      //Hàm xử lý kết quả (nếu có lỗi hoặc token được tạo thành công).
      if (error) {
        throw reject(error) // Trả về lỗi nếu có
      }
      resolve(token as string) // Trả về token nếu thành công
    })
  })
}
