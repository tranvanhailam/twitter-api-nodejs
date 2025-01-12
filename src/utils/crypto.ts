import { createHash } from 'crypto'

//Hash password
// Tạo hàm băm (hash) từ một chuỗi đầu vào bằng thuật toán SHA-256.
// createHash('sha256'): Sử dụng thuật toán SHA-256.
// .update(content): Cập nhật nội dung cần băm.
// .digest('hex'): Trả về kết quả băm dưới dạng chuỗi hexadecimal.
export function sha256(content: string) {
  return createHash('sha256').update(content).digest('hex')
}

export function hashPassword(password: string) {
  return sha256(password + process.env.PASSWORD_SECRET) //Kết hợp mật khẩu của người dùng với một giá trị bí mật (PASSWORD_SECRET) trước khi băm.
}

// Tại sao phải hash mật khẩu?
// Mật khẩu không bao giờ được lưu trực tiếp (dưới dạng plain text) trong cơ sở dữ liệu. Thay vào đó, chúng được lưu dưới dạng hash vì các lý do sau:

// Bảo vệ thông tin người dùng:
// Nếu cơ sở dữ liệu bị tấn công, hacker sẽ không có được mật khẩu thật.
// Dữ liệu băm không thể được "giải mã" về giá trị ban đầu (một chiều).

// Ngăn chặn tấn công Rainbow Table:
// Rainbow Table là một danh sách các giá trị băm của các mật khẩu phổ biến.
// Bằng cách sử dụng giá trị bí mật (PASSWORD_SECRET hay còn gọi là salt), mỗi hash sẽ duy nhất và làm cho Rainbow Table vô dụng.

// Bảo mật nâng cao với Salt:
// Nối thêm một chuỗi bí mật (salt) giúp mỗi mật khẩu khi băm sẽ khác nhau, ngay cả khi hai người dùng có cùng mật khẩu

// Ví dụ:
// password1 + secret1 => hash1
// password1 + secret2 => hash2

// Không thể đảo ngược:
// Hashing là một hàm một chiều (one-way), nghĩa là bạn không thể "giải mã" để quay về mật khẩu gốc.
