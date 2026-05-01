# 📋 KẾ HOẠCH TRIỂN KHAI DỰ ÁN CLEAN BLOG FS

### 1. **Phân tích & Thiết kế**
- [x] Hiểu rõ yêu cầu chức năng: Hệ thống quản lý bài viết fullstack với phân quyền (RBAC), quản lý danh mục và tích hợp AI.
- [x] Thiết kế UI Prototypes bằng Stitch.
- [x] Viết tài liệu tổng quan (01-project-overview.md).
- [x] Viết tài liệu yêu cầu (02-requirements.md).
- [x] Viết tài liệu thiết kế database (03-database-design.md).
- [x] Viết tài liệu đặc tả API v1 (04-api-design.md).
- [x] Viết tài liệu cấu trúc giao diện (05-ui-structure.md).
- [x] Viết tài liệu luồng hệ thống (06-system-flow.md).

### 2. **Thiết lập Backend (NodeJS + Express + MongoDB)**
- [x] Khởi tạo project Backend, cấu hình Express và Mongoose.
- [x] Tạo Database trên MongoDB.
- [x] Xây dựng các Models/Schemas (`models/`).
- [x] Cấu hình các Routes (`routes/`).
- [x] Xây dựng các Controllers xử lý logic:
  - [x] Auth Controller (`auth.controller`).
  - [x] Role Controller (`role.controller`).
  - [x] User Controller (`user.controller`).
  - [x] Post Controller (`post.controller`).
  - [x] Category Controller (`category.controller`).
  - [x] Setting Controller (`setting.controller`).

### 3. **Thiết lập Frontend (ReactJS + Vite + TailwindCSS + Ant Design)**
- [x] Khởi tạo project Frontend với Vite.
- [x] Định nghĩa danh sách các Route trong `routes/index.js`.
- [x] Tạo các Layout cơ bản (AdminLayout, ClientLayout, AuthLayout).
- [x] Trang Đăng nhập & Đăng ký (Auth).
- [x] Giao diện Client:
  - [x] Trang danh sách bài viết.
  - [x] Trang chi tiết bài viết.
- [x] Giao diện Admin/Dashboard:
  - [x] Quản lý Bài viết (Blogs).
  - [x] Quản lý Người dùng (Users).
  - [x] Quản lý Vai trò (Roles).
  - [x] Quản lý Danh mục (Categories).
  - [x] Quản lý Cài đặt hệ thống (Settings).
- [x] Tối ưu hóa các UI Components dùng chung (Table, Form, Modal).

### 4. **Kết nối API & Logic Nghiệp vụ**
- [x] Cấu hình Axios instance, interceptors xử lý JWT Token.
- [x] Viết các Services gọi API (auth, post, category...).
- [x] Đồng bộ hóa dữ liệu và trạng thái hệ thống bằng Actions & Reducers.
- [x] Thay thế các bảng và thanh công cụ cũ bằng `DataTable` và `DataToolbar` dùng chung.
- [x] Hoàn thiện chức năng Tìm kiếm và Phân trang (Client).

### 5. **Kiểm thử & Hoàn thiện**
- [x] Kiểm tra Login và Register có hoạt động tốt.
- [x] Kiểm tra lại toàn bộ logic Soft Delete (`deleted: true`) trên cả Backend và Frontend.
- [x] Đảm bảo mọi bài viết/danh mục đều có logic Soft Delete và Auth check (JWT).
- [x] Tối ưu hóa SEO (Title, Meta description) dựa trên dữ liệu từ Setting.
- [x] Tối ưu giao diện Admin Dashboard đẹp hơn.

### 6. **Triển khai & Tài liệu hóa**
- [x] Xây dựng bản build sản xuất (`npm run build`).
- [x] Kiểm tra lỗi cuối cùng và đóng gói ứng dụng.