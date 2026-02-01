# TÀI LIỆU PHÂN TÍCH & THIẾT KẾ HỆ THỐNG

## Dự án: Hệ thống Quản lý Bài viết Cá nhân - Nakai Blog

---

## 1. Giới thiệu

### 1.1. Mục tiêu dự án

Hệ thống Quản lý Bài viết Cá nhân được xây dựng nhằm hỗ trợ người dùng tạo, chỉnh sửa, lưu trữ và quản lý các bài viết cá nhân một cách hiệu quả. Hệ thống hướng đến việc đơn giản hóa quy trình viết blog, ghi chú học tập hoặc lưu trữ nội dung cá nhân, đồng thời đảm bảo dữ liệu được tổ chức khoa học và dễ dàng truy xuất.

### 1.2. Phạm vi dự án

- Quản lý bài viết cá nhân (CRUD)
- Lưu trữ trên cơ sở dữ liệu
- Giao diện thân thiện, dễ sử dụng
- Không tập trung vào mạng xã hội hay tương tác đa người dùng (phiên bản cơ bản)

### 1.3. Đối tượng sử dụng

- Cá nhân viết blog
- Sinh viên ghi chép kiến thức
- Lập trình viên ghi chú kỹ thuật

---

## 2. Tổng quan hệ thống

### 2.1. Mô tả hệ thống

Hệ thống là một ứng dụng web cho phép người dùng tạo bài viết mới, chỉnh sửa nội dung, lưu lịch sử bài viết và quản lý trạng thái bài viết. Dữ liệu có thể được lưu trữ trên trình duyệt hoặc thông qua backend (ở giai đoạn mở rộng).

### 2.2. Kiến trúc tổng thể

- **Frontend**: ReactJS + Ant Design
- **Backend**: NodeJS + Express
- **Database**: MongoDB

---

## 3. Phân tích yêu cầu hệ thống

### 3.1. Actor

| Actor | Mô tả                                      |
| ----- | ------------------------------------------ |
| User  | Người sử dụng hệ thống để quản lý bài viết |

### 3.2. Use Case

- Tạo bài viết mới
- Chỉnh sửa bài viết
- Lưu bài viết
- Xem danh sách bài viết
- Tìm kiếm bài viết
- Xóa bài viết
- Xuất bài viết (PDF/Markdown)

### 3.3. Sơ đồ Use Case (mô tả)

User tương tác trực tiếp với hệ thống thông qua giao diện web để thực hiện toàn bộ các chức năng quản lý bài viết.

---

## 4. Yêu cầu chức năng

### 4.1. Quản lý bài viết

- Tạo bài viết mới với tiêu đề và nội dung
- Chỉnh sửa bài viết hiện có
- Lưu lịch sử chỉnh sửa
- Xóa bài viết

### 4.2. Quản lý trạng thái

- Bài viết có trạng thái: Nháp / Hoạt động
- Cho phép bật/tắt trạng thái bài viết

### 4.3. Tìm kiếm & lọc

- Tìm kiếm theo tiêu đề
- Sắp xếp theo thời gian tạo

### 4.4. Xuất dữ liệu

- Xuất bài viết sang PDF hoặc Markdown

---

## 5. Yêu cầu phi chức năng

- Giao diện thân thiện, responsive
- Hiệu năng tốt với số lượng bài viết vừa phải (<1000 bài)
- Dữ liệu không bị mất khi reload trang
- Dễ bảo trì và mở rộng

---

## 6. Thiết kế hệ thống

### 6.1. Thiết kế giao diện (UI)

- Sidebar: Danh sách bài viết, tìm kiếm
- Main Content: Trình soạn thảo bài viết
- Toolbar: Lưu, chỉnh sửa, xem trước, xuất file

### 6.2. Thiết kế component (React)

- `BlogGenerator`: Component chính
- `BlogEditor`: Soạn thảo và chỉnh sửa bài viết
- `BlogHistory`: Danh sách lịch sử bài viết

### 6.3. Luồng xử lý chính

1. User tạo bài viết mới
2. Nhập nội dung
3. Lưu bài viết → LocalStorage
4. Hiển thị trong danh sách bài viết

---

## 7. Thiết kế dữ liệu

### 7.1. Cấu trúc User

```json
{
  "id": "string",
  "name": "string",
  "username": "string",
  "email": "string",
  "password": "string (hashed)",
  "role": "admin | user",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### 7.2. Cấu trúc Post (Bài viết)

```json
{
  "id": "string",
  "title": "string",
  "content": "string",
  "status": "active | draft",
  "authorId": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

---

## 8. Bảo mật & rủi ro

- Mất dữ liệu khi xóa cache trình duyệt
- Chưa có xác thực người dùng
- Chưa mã hóa dữ liệu

**Giải pháp mở rộng**:

- Thêm đăng nhập
- Lưu dữ liệu trên server

---

## 9. Kế hoạch mở rộng

- Thêm backend (NodeJS / NestJS)
- Database (MySQL / MongoDB)
- Đăng nhập & phân quyền
- Đồng bộ dữ liệu đa thiết bị

---

## 10. Kết luận

Hệ thống Quản lý Bài viết Cá nhân là một giải pháp đơn giản nhưng hiệu quả cho nhu cầu viết và lưu trữ nội dung cá nhân. Với kiến trúc mở, hệ thống có khả năng mở rộng thành một nền tảng blog hoàn chỉnh trong tương lai.

---

_Tài liệu phục vụ cho mục đích học tập và phát triển dự án cá nhân._
