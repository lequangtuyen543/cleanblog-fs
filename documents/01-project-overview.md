# 📘 Tổng Quan Dự Án  
## Hệ Thống Quản Lý Bài Viết (Blog Management System)

---

## 1. Mô Tả Dự Án

Hệ Thống Quản Lý Bài Viết là một ứng dụng web fullstack cho phép người dùng tạo, chỉnh sửa, quản lý và xuất bản các bài viết.

Dự án được xây dựng nhằm mục đích luyện tập và nâng cao kỹ năng phát triển fullstack sử dụng NodeJS (backend) và ReactJS (frontend).

---

## 2. Mục Tiêu Dự Án

- Xây dựng hệ thống CRUD hoàn chỉnh cho blog
- Triển khai xác thực và phân quyền người dùng bằng JWT
- Thiết kế RESTful API rõ ràng và chuẩn chỉnh
- Kết nối backend và frontend một cách hiệu quả
- Áp dụng cấu trúc dự án sạch và dễ mở rộng
- Rèn luyện tư duy thiết kế hệ thống trước khi lập trình

---

## 3. Đối Tượng Sử Dụng

- **Quản trị viên (Admin):**
  - Quản lý tất cả bài viết
  - Quản lý người dùng

- **Người dùng (User):**
  - Tạo bài viết
  - Chỉnh sửa bài viết của mình
  - Xóa (soft delete) bài viết của mình

- **Khách (Guest):**
  - Xem danh sách bài viết công khai
  - Xem chi tiết bài viết

---

## 4. Chức Năng Chính

### Xác Thực Người Dùng
- Đăng ký tài khoản
- Đăng nhập
- Đăng xuất
- Xác thực bằng JWT
- Phân quyền theo vai trò (admin / user)

### Quản Lý Bài Viết
- Tạo bài viết mới
- Chỉnh sửa bài viết
- Xóa mềm (soft delete)
- Xem chi tiết bài viết
- Xem danh sách bài viết
- Tìm kiếm bài viết

---

## 5. Công Nghệ Sử Dụng

### Backend
- NodeJS
- ExpressJS
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcrypt

### Frontend
- ReactJS
- Tailwind
- React Router
- Ant Design (thư viện giao diện)

---

## 6. Kiến Trúc Hệ Thống

ReactJS (Client)  
↓  
REST API (ExpressJS)  
↓  
MongoDB (Database)

Luồng xác thực:

Người dùng → Đăng nhập → Nhận JWT → Lưu token →  
Gửi token trong header Authorization → Backend xác thực → Trả dữ liệu

---

## 7. Phạm Vi Dự Án

### Bao Gồm
- Hệ thống CRUD blog đầy đủ
- Xác thực và phân quyền
- Route bảo vệ (Protected Routes)
- Cấu trúc thư mục rõ ràng
- Giao diện cơ bản, responsive

### Chưa Bao Gồm (giai đoạn hiện tại)
- Hệ thống bình luận
- Thông báo thời gian thực
- CI/CD tự động
- Kiến trúc microservices

---

## 8. Hướng Phát Triển Tương Lai

- Thêm chức năng bình luận
- Upload hình ảnh
- Phân trang (Pagination)
- Tài liệu API bằng Swagger
- Triển khai lên cloud (Render / Vercel / AWS)

---

## 9. Phương Pháp Phát Triển

1. Phân tích yêu cầu
2. Thiết kế cơ sở dữ liệu
3. Thiết kế API
4. Xây dựng backend
5. Xây dựng frontend
6. Kết nối và kiểm thử
7. Tối ưu và refactor

---

## 10. Mục Đích Thực Hiện Dự Án

- Luyện tập phát triển fullstack
- Rèn luyện tư duy thiết kế hệ thống
- Tránh lập trình theo kiểu "làm đến đâu nghĩ đến đó"
- Chuẩn bị cho môi trường làm việc thực tế

---

Tác giả: [Lê Quang Tuyến]  
Phiên bản: 1.0  
Trạng thái: Giai đoạn phân tích & thiết kế
