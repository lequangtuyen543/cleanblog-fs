# 🎨 Cấu Trúc Giao Diện (UI Structure)  
## Blog Management System

---

# 1. Tổng Quan

Frontend được xây dựng bằng ReactJS theo mô hình SPA (Single Page Application).

Ứng dụng sử dụng:
- React Router để điều hướng
- Axios để gọi API
- Ant Design để xây dựng giao diện

Mục tiêu:
- Cấu trúc rõ ràng
- Dễ mở rộng
- Dễ bảo trì
- Phân tách component hợp lý

---

# 2. Cấu Trúc Trang (Pages Structure)

## 2.1. Public Pages (Không cần đăng nhập)

- /login
- /register
- /posts
- /posts/:id

---

## 2.2. Protected Pages (Cần đăng nhập)

- /dashboard
- /profile
- /users (Admin)
- /users/:id (Admin)

---

# 3. Layout Structure

## 3.1. Auth Layout

Áp dụng cho:
- Login
- Register

Cấu trúc:

AuthLayout
 └── AuthForm

---

## 3.2. Main Layout

Áp dụng cho:
- Dashboard
- Posts
- Users
- Profile

Cấu trúc:

MainLayout
 ├── Header
 ├── Sidebar
 └── Content

---

# 4. Cấu Trúc Component Theo Tính Năng

## 4.1. Authentication

components/auth/
- LoginForm
- RegisterForm

---

## 4.2. Posts

pages/posts/
- PostListPage
- PostDetailPage
- PostCreatePage
- PostEditPage

components/posts/
- PostCard
- PostForm
- PostSearch

---

## 4.3. Users

pages/users/
- UserListPage
- UserDetailPage
- UserEditPage

components/users/
- UserTable
- UserForm

---

## 4.4. Profile

pages/profile/
- ProfilePage

components/profile/
- ProfileInfo
- ChangePasswordForm

---

# 5. Routing Design

Public Routes:
- /login
- /register
- /posts
- /posts/:id

Protected Routes:
- /dashboard
- /profile
- /posts/create
- /posts/edit/:id

Admin Routes:
- /users
- /users/:id

---

# 6. State Management Strategy

- Lưu JWT token trong localStorage
- Lưu thông tin user trong Context API
- Không dùng Redux ở giai đoạn hiện tại
- Tách riêng service gọi API

services/
- auth.service.js
- user.service.js
- post.service.js

---

# 7. Quy Tắc Thiết Kế UI

- Không viết logic gọi API trực tiếp trong component lớn
- Tách component nhỏ, dễ tái sử dụng
- Không để file quá 300 dòng
- Tách layout và page rõ ràng
- Route phải khớp với API design

---

# 8. Luồng Hoạt Động UI Chính

## 8.1. Đăng nhập

User nhập thông tin  
→ Gọi API login  
→ Nhận token  
→ Lưu localStorage  
→ Chuyển hướng dashboard  

---

## 8.2. Tạo bài viết

User nhập tiêu đề + nội dung  
→ Gọi API POST /posts  
→ Nếu thành công → redirect về danh sách  

---

# 9. Tiêu Chí Hoàn Thành

UI được xem là hoàn chỉnh khi:

- Tất cả route hoạt động đúng
- Protected route hoạt động chính xác
- Phân quyền Admin hoạt động đúng
- Không có component trùng lặp chức năng
- Không có logic rối trong component

---

Tác giả: Lê Quang Tuyến  
Phiên bản: 1.0  
Trạng thái: Giai đoạn thiết kế