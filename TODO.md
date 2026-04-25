# TODO Project

## Analysis + Design
- [x] Viết tài liệu tổng quan v1.1
- [x] Viết tài liệu yêu cầu v1.1
- [x] Viết tài liệu database v1.1
- [x] Viết tài liệu API v1.1
- [x] Viết tài liệu giao diện v1.1
- [x] Viết tài liệu luồng hoạt động v1.1

---

## Backend
- [x] Code các file cho thư mục models
- [x] Tạo database trên mongodb
- [x] Code các file cho thư mục routes

### Controllers
- [x] Code file auth.controller
- [x] Code file role.controller
- [x] Code file user.controller
- [x] Code file post.controller
- [x] Code file category.controller
- [x] Code file setting.controller

---

## Frontend
- [x] Thiết kế giao diện bằng Stitch

### 1: `routes/` & `layout/` (Xây dựng khung xương)

- [x] Định nghĩa danh sách các Route trong `routes/index.js`
- [x] Tạo các Layout cơ bản (AdminLayout, ClientLayout, AuthLayout) trong `layout/`
- [x] Code các file cần thiết cho `layout/auth/`
- [x] Code các file cần thiết cho `layout/client/`
- [x] Code các file cần thiết cho `layout/admin/`

### 2: `services/` & `utils/` (Thiết lập kết nối API)

- [x] Cấu hình Axios instance, interceptors xử lý Token trong `services/api.js`
- [x] Viết các service gọi API (auth, post, category...)

### 3: `pages/auth`

- [x] Code trang Login và Register để có thể đăng nhập lấy Token
- [x] Kiểm tra login và register có hoạt động không

### 4: `pages/client`

- [x] Code trang danh sách bài viết và chi tiết bài viết
- [x] Code các file cần thiết cho `pages/client/`

### 5: `pages/admin`

- [x] Code Dashboard và các trang quản lý (User, Category, Role, Settings)
- [x] Cập nhật lại code trang Dashboard cho đẹp hơn 
- [x] Hoàn thiện các chức năng và giao diện của Blogs
- [x] Hoàn thiện các chức năng và giao diện của Users
- [x] Hoàn thiện các chức năng và giao diện của Roles
- [x] Hoàn thiện các chức năng và giao diện của Categories
- [x] Hoàn thiện các chức năng và giao diện của Settings

### 6: `components/` 

- [ ] Tối ưu hóa các thành phần dùng chung như Table, Form, Modal

### 7: `actions/` & `reducers/` 

- [ ] Đồng bộ hóa dữ liệu người dùng và trạng thái hệ thống toàn cục