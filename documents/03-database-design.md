# 🗄 Thiết Kế Cơ Sở Dữ Liệu  
## Blog Management System

---

# 1. Tổng Quan

Hệ thống sử dụng MongoDB làm cơ sở dữ liệu dạng NoSQL.  
Dữ liệu được tổ chức theo collection và liên kết thông qua ObjectId.

Hiện tại hệ thống bao gồm 2 collection chính:

- users
- posts

---

# 2. Collection: users

## 2.1. Mô Tả

Lưu trữ thông tin tài khoản người dùng và phân quyền.

## 2.2. Cấu Trúc Schema

User {
  _id: ObjectId,
  username: String,            // duy nhất
  email: String,               // duy nhất
  password: String,            // đã hash
  role: String,                // "admin" | "user"
  status: String,              // "active" | "inactive"
  createdAt: Date,
  updatedAt: Date
}

## 2.3. Ràng Buộc

- username: bắt buộc, unique
- email: bắt buộc, unique
- password: bắt buộc
- role: mặc định = "user"
- status: mặc định = "active"

## 2.4. Index Đề Xuất

- index unique cho username
- index unique cho email

---

# 3. Collection: posts

## 3.1. Mô Tả

Lưu trữ nội dung bài viết được tạo bởi người dùng.

## 3.2. Cấu Trúc Schema

Post {
  _id: ObjectId,
  title: String,
  content: String,
  createdBy: String,          // tham chiếu users._id
  deleted: Boolean,            // soft delete
  createdAt: Date,
  updatedAt: Date
}

## 3.3. Ràng Buộc

- title: bắt buộc
- content: bắt buộc
- authorId: bắt buộc
- deleted: mặc định = false

## 3.4. Quan Hệ

- Một User có thể có nhiều Post (1 - N)
- Một Post chỉ thuộc về một User

Quan hệ được thiết lập thông qua trường createdBy.

---

# 4. Quan Hệ Giữa Các Collection

User (1)  ------  (N) Post  
   _id           createdBy

- Khi xóa user (nếu có), cần xử lý:
  - Hoặc xóa toàn bộ bài viết của user
  - Hoặc giữ bài viết nhưng đánh dấu inactive

Hiện tại hệ thống KHÔNG hỗ trợ xóa user khỏi database.

---

# 5. Quy Tắc Thiết Kế

- Sử dụng Soft Delete cho Post
- Không lưu dữ liệu thừa
- Không nhúng toàn bộ thông tin user vào Post
- Sử dụng reference (authorId) để đảm bảo dữ liệu đồng nhất

---

# 6. Mở Rộng Trong Tương Lai

Có thể bổ sung thêm các collection:

- comments
- categories
- tags
- refreshTokens

Ví dụ:

Comment {
  _id: ObjectId,
  content: String,
  postId: ObjectId,
  userId: ObjectId,
  createdAt: Date
}

---

# 7. Tiêu Chuẩn Hoàn Thành

Thiết kế database được xem là hoàn chỉnh khi:

- Đủ để triển khai toàn bộ chức năng FR-01 đến FR-13
- Không cần thay đổi cấu trúc lớn trong quá trình code
- Quan hệ dữ liệu rõ ràng
- Không trùng lặp dữ liệu không cần thiết

---

Tác giả: [Lê Quang Tuyến]  
Phiên bản: 1.0  
Trạng thái: Giai đoạn phân tích & thiết kế