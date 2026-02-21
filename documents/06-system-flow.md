# 🔄 System Flow  
## Blog Management System

---

# 1. Tổng Quan Luồng Hệ Thống

Hệ thống hoạt động theo mô hình:

Client (ReactJS)
        ↓
API Server (NodeJS + Express)
        ↓
Database (MySQL)

Tất cả request đều đi qua:
- Middleware xác thực (Authentication)
- Middleware phân quyền (Authorization)
- Controller xử lý logic
- Service thao tác database

---

# 2. Authentication Flow (Luồng Đăng Nhập)

## 2.1. Đăng Ký

User nhập:
- username
- email
- password

Flow:

Client
→ POST /api/v1/auth/register
→ Server validate dữ liệu
→ Hash password (bcrypt)
→ Lưu user vào database
→ Trả về response thành công

---

## 2.2. Đăng Nhập

User nhập:
- username/email
- password

Flow:

Client
→ POST /api/v1/auth/login
→ Server kiểm tra user tồn tại
→ So sánh password (bcrypt.compare)
→ Tạo JWT token
→ Trả token về client

Client:
→ Lưu token vào localStorage
→ Gắn token vào Authorization header cho các request sau

---

## 2.3. Xác Thực Request

Khi gọi API protected:

Client
→ Gửi request kèm:
Authorization: Bearer <token>

Server:
→ Middleware verify JWT
→ Giải mã token
→ Gắn req.user
→ Chuyển tiếp đến controller

Nếu token sai:
→ Trả 401 Unauthorized

---

# 3. Authorization Flow (Phân Quyền)

Hệ thống có 2 role:
- USER
- ADMIN

Middleware kiểm tra:

if (req.user.role !== 'ADMIN')
    → return 403 Forbidden

Áp dụng cho:
- Quản lý user
- Chỉnh sửa/xóa bài viết của người khác

---

# 4. Post Management Flow

## 4.1. Tạo Bài Viết

Client:
→ POST /api/v1/posts

Server:
→ Verify JWT
→ Lấy userId từ token
→ Tạo post với authorId = userId
→ Lưu database
→ Trả về post mới tạo

---

## 4.2. Xem Danh Sách Bài Viết

Client:
→ GET /api/v1/posts?search=abc&page=1&limit=10

Server:
→ Lọc deleted = false
→ Áp dụng search nếu có
→ Phân trang
→ Trả danh sách

---

## 4.3. Chỉnh Sửa Bài Viết

Client:
→ PATCH /api/v1/posts/:id

Server:
→ Verify JWT
→ Tìm post theo id
→ Kiểm tra:
   - Nếu user là author → cho phép
   - Nếu role ADMIN → cho phép
   - Ngược lại → 403

→ Cập nhật dữ liệu
→ Trả về post đã cập nhật

---

## 4.4. Xóa Bài Viết (Soft Delete)

Client:
→ DELETE /api/v1/posts/:id

Server:
→ Verify JWT
→ Kiểm tra quyền
→ Update:
   deleted = true
→ Trả response thành công

---

# 5. User Management Flow (Admin)

## 5.1. Xem Danh Sách User

Client (Admin):
→ GET /api/v1/users

Server:
→ Verify JWT
→ Check role ADMIN
→ Trả danh sách user

---

## 5.2. Cập Nhật User

Client:
→ PATCH /api/v1/users/:id

Server:
→ Verify JWT
→ Check role ADMIN
→ Cập nhật thông tin user

---

# 6. Error Handling Flow

Tất cả lỗi được xử lý theo chuẩn:

Controller
→ Throw Error
→ Global Error Handler Middleware
→ Trả về JSON:

{
  code: 400,
  message: "Error message"
}

---

# 7. Token Expired Flow

Nếu token hết hạn:

Server:
→ Trả 401

Client:
→ Bắt lỗi 401
→ Redirect về /login
→ Xóa token localStorage

---

# 8. Logout Flow

Client:
→ Xóa token localStorage
→ Redirect /login

Server:
→ Không cần xử lý (JWT stateless)

---

# 9. Luồng Tổng Thể Khi User Sử Dụng Hệ Thống

1. Đăng ký
2. Đăng nhập
3. Xem danh sách bài viết
4. Tạo bài viết
5. Chỉnh sửa bài viết
6. Logout

---

# 10. Tiêu Chí Hoàn Thành System Flow

- Không có route nào thiếu middleware cần thiết
- Không có logic phân quyền nằm rải rác
- Error được xử lý tập trung
- Không có endpoint nào không kiểm tra quyền
- JWT được verify trước mọi protected route

---

Tác giả: Lê Quang Tuyến  
Phiên bản: 1.0  
Trạng thái: Giai đoạn thiết kế