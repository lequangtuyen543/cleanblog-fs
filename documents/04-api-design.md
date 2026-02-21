# 🔌 Thiết Kế API  
## Blog Management System

---

# 1. Tổng Quan

Hệ thống sử dụng RESTful API với chuẩn JSON.  
Tất cả endpoint được đặt tiền tố:

/api/v1

Dữ liệu trả về theo format:

{
  code: Int,
  message: String,
  data: Array || Object || null
}

Các route yêu cầu xác thực sẽ sử dụng JWT trong header:

Authorization: Bearer <token>

---

# 2. Authentication APIs

## 2.1. Đăng Ký

POST /api/v1/auth/register

Request Body:
{
  name: String,
  username: String,
  email: String,
  password: String
}

Response (Success):
{
  code: 200,
  message: "Đăng ký thành công",
  data: null
}

---

## 2.2. Đăng Nhập

POST /api/v1/auth/login

Request Body:
{
  username: String,
  password: String
}

Response (Success):
{
  code: 200,
  message: "Đăng nhập thành công",
  data: {
    token: String
  }
}

---

# 3. User APIs

## 3.1. Lấy Danh Sách Người Dùng (Admin)

GET /api/v1/users

Auth: Required (Admin)

Query Params (optional):
- keyword (search theo username hoặc email)

Response:
{
  code: 200,
  data: [User]
}

---

## 3.2. Lấy Thông Tin Cá Nhân

GET /api/v1/users/info

Auth: Required

Response:
{
  code: 200,
  data: UserInfo
}

---

## 3.3. Cập Nhật Người Dùng

PATCH /api/v1/users/edit/:id

Auth: Required

Request Body:
{
  username?: String,
  role?: String (admin only),
  status?: String (admin only)
}

Response:
{
  code: 200,
  message: "Cập nhật thành công",
  data: User
}

---

## 3.4. Đổi Mật Khẩu

PATCH /api/v1/users/change-password

Auth: Required

Request Body:
{
  oldPassword: String,
  newPassword: String
}

---

# 4. Post APIs

## 4.1. Tạo Bài Viết

POST /api/v1/posts/create

Auth: Required

Request Body:
{
  title: String,
  content: String
}

---

## 4.2. Lấy Danh Sách Bài Viết

GET /api/v1/posts

Auth: Optional

Query Params (optional):
- keyword (search theo title)

Chỉ trả về bài viết có deleted = false.

---

## 4.3. Lấy Chi Tiết Bài Viết

GET /api/v1/posts/detail/:id

Auth: Optional

---

## 4.4. Cập Nhật Bài Viết

PATCH /api/v1/posts/edit/:id

Auth: Required

- User chỉ cập nhật bài của mình
- Admin cập nhật mọi bài

---

## 4.5. Xóa Bài Viết (Soft Delete)

DELETE /api/v1/posts/delete/:id

Auth: Required

Hệ thống chỉ cập nhật:

deleted = true

---

# 5. HTTP Status Codes

- 200: Thành công
- 201: Tạo mới thành công
- 400: Lỗi dữ liệu đầu vào
- 401: Chưa xác thực
- 403: Không có quyền
- 404: Không tìm thấy
- 500: Lỗi server

---

# 6. Quy Tắc Thiết Kế

- Sử dụng danh từ cho route (users, posts)
- Không dùng động từ trong URL
- Dùng đúng HTTP method (GET, POST, PATCH, DELETE)
- Luôn trả về JSON
- Xử lý lỗi tập trung

---

# 7. Tiêu Chí Hoàn Thành

API được xem là hoàn chỉnh khi:

- Đáp ứng đầy đủ FR-01 đến FR-13
- Phân quyền hoạt động đúng
- Soft delete hoạt động chính xác
- JWT xác thực ổn định
- Không có route trùng lặp hoặc dư thừa

---

Tác giả: [Lê Quang Tuyến]  
Phiên bản: 1.0  
Trạng thái: Giai đoạn phân tích & thiết kế