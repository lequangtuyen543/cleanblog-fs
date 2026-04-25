# 🧠 Clean Blog FS - Blog Management System

**Clean Blog FS** là hệ thống quản lý bài viết **full-stack** được xây dựng nhằm luyện tập kết nối giữa Backend NodeJS và Frontend ReactJS với hỗ trợ **RBAC, quản lý danh mục và tích hợp AI**.

---

## 📋 Mục Lục
- [🎯 Tổng Quan](#-tổng-quan)
- [⚙️ Công Nghệ Sử Dụng](#️-công-nghệ-sử-dụng)
- [🔑 Chức Năng Chính](#-chức-năng-chính)
- [📂 Cấu Trúc Dự Án](#-cấu-trúc-dự-án)
- [🏛️ Kiến Trúc Hệ Thống](#️-kiến-trúc-hệ-thống)
- [📚 Tài Liệu & Tài Nguyên](#-tài-liệu--tài-nguyên)
- [📝 Tiêu Chuẩn & Quy Tắc](#-tiêu-chuẩn--quy-tắc)
- [🚀 Hướng Dẫn Phát Triển](#-hướng-dẫn-phát-triển)

---

## 🎯 Tổng Quan

| Thông tin | Chi tiết |
|-----------|---------|
| **Tên dự án** | Clean Blog FS |
| **Mục tiêu** | Hệ thống quản lý bài viết với phân quyền (RBAC), quản lý danh mục và tích hợp AI |
| **Trạng thái** | Phát triển (Development) - Hoàn xong phân tích & thiết kế |
| **Loại** | Full-Stack Application |

### 🎓 Mục Đích Học Tập
* Hiểu luồng hoạt động **Frontend ↔ Backend ↔ Database**
* Thực hành **RESTful API** thiết kế chuyên nghiệp
* Làm quen với **xác thực người dùng bằng JWT Bearer Token**
* Rèn kỹ năng tổ chức project full-stack
* Thực hành **RBAC (Role-Based Access Control)**
* Áp dụng **Soft Delete** để bảo toàn dữ liệu

---

## ⚙️ Công Nghệ Sử Dụng

### Backend
| Công nghệ | Vai trò |
|-----------|--------|
| **NodeJS** | Runtime environment |
| **Express** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB ODM/Schema |
| **TypeScript** | Type-safe development |
| **JWT** | Xác thực người dùng |
| **Bcrypt** | Mã hóa mật khẩu |

### Frontend
| Công nghệ | Vai trò |
|-----------|--------|
| **ReactJS** | UI framework |
| **Vite** | Build tool & dev server |
| **TypeScript** | Type-safe development |
| **TailwindCSS** | Utility-first CSS |
| **Ant Design** | Component library |
| **Fetch API** | HTTP client |

---

## 🔑 Chức Năng Chính

### 👤 Xác Thực & Phân Quyền
- Đăng ký / Đăng nhập người dùng
- Xác thực bằng JWT Bearer Token
- Phân quyền theo vai trò (Admin, User)
- Bảo mật mật khẩu với Bcrypt

### 📝 Quản Lý Bài Viết
- CRUD bài viết (Create, Read, Update, Delete)
- Soft Delete - giữ lại bản ghi để khôi phục
- Tạo slug thân thiện cho URL
- Phân trang bài viết

### 📂 Quản Lý Danh Mục
- CRUD danh mục
- Liên kết bài viết với danh mục
- Quản lý quyền truy cập theo danh mục

### 👥 Quản Lý Người Dùng
- Danh sách người dùng
- Quản lý vai trò và quyền hạn
- Theo dõi người dùng và bài viết của họ

### 🔍 Tính Năng Bổ Sung
- Search / Filter bài viết
- Populate dữ liệu liên kết
- API Response chuẩn format

---

## 📂 Cấu Trúc Dự Án

```
clean-blog-fs/
├── ai-agent/
│   └── PROJECT_KNOWLEDGE.md          # Kiến thức cơ bản hệ thống
├── documents/                        # Tài liệu thiết kế
│   ├── 01-project-overview.md
│   ├── 02-requirements.md
│   ├── 03-database-design.md
│   ├── 04-api-design.md
│   ├── 05-ui-structure.md
│   └── 06-system-flow.md
├── backend/                          # NodeJS + Express + MongoDB
│   ├── api/v1/                       # API v1 routes & logic
│   ├── config/                       # Cấu hình (database, system)
│   ├── helpers/                      # Helper functions
│   ├── index.ts                      # Entry point
│   └── package.json
├── frontend/                         # ReactJS + Vite
│   ├── src/
│   │   ├── pages/                    # Trang (Admin, Client, Auth)
│   │   ├── components/               # React components
│   │   ├── services/                 # API services
│   │   └── utils/                    # Utility functions
│   ├── public/
│   ├── tailwind.config.js
│   └── package.json
├── stitch_clean_blog_management_system/  # UI Prototypes & Design
├── README.md
└── TODO.md
```

---

## 🏛️ Kiến Trúc Hệ Thống

### Database Schema (MongoDB)
- **Users** - Thông tin người dùng
- **Roles** - Định nghĩa vai trò & quyền hạn
- **Posts** - Bài viết
- **Categories** - Danh mục
- **Settings** - Cấu hình hệ thống

### API Architecture
```
RESTful API v1
├── /api/v1/auth/           # Xác thực
├── /api/v1/posts/          # Bài viết
├── /api/v1/categories/     # Danh mục
├── /api/v1/users/          # Người dùng
└── /api/v1/roles/          # Vai trò
```

### Response Format
```json
{
  "code": 200,
  "message": "Success",
  "data": { /* Response data */ }
}
```

---

## 📚 Tài Liệu & Tài Nguyên

### Tài Liệu Thiết Kế (Design Documents)
Tất cả tài liệu nằm trong thư mục `/documents`:
- **01-project-overview.md** - Tầm nhìn và phạm vi dự án
- **02-requirements.md** - Danh sách chức năng (FR) và yêu cầu bảo mật (NFR)
- **03-database-design.md** - Cấu trúc các Collection
- **04-api-design.md** - Đặc tả chi tiết các Endpoint RESTful
- **05-ui-structure.md** - Sơ đồ trang và layout
- **06-system-flow.md** - Luồng hoạt động hệ thống

### UI Prototypes
- `/stitch_clean_blog_management_system` - Mẫu giao diện thiết kế bằng Stitch

### AI Agent Knowledge Base
- `/ai-agent/PROJECT_KNOWLEDGE.md` - Nguồn dữ liệu chuẩn cho AI Agent

---

## 📝 Tiêu Chuẩn & Quy Tắc

### Naming Conventions
| Loại | Quy Tắc | Ví Dụ |
|------|---------|-------|
| Biến / Hàm | camelCase | `getUserById`, `blogTitle` |
| React Component | PascalCase | `BlogCard`, `AdminLayout` |
| URL / Slug | kebab-case | `hoc-javascript-co-ban` |
| Collection | Plural | `users`, `posts`, `categories` |

### Bảo Mật
- **Mật khẩu** - Hash với Bcrypt (không lưu plaintext)
- **API** - Bảo vệ bằng JWT Bearer Token
- **Headers** - `Authorization: Bearer <token>`

### Data Integrity
- ⭐ **Luôn sử dụng Soft Delete** (`deleted: true`)
- Không xóa vật lý bản ghi khỏi database
- Cho phép khôi phục dữ liệu khi cần

### API Response Standard
- Luôn trả về format: `{ code, message, data }`
- `code` - HTTP status code
- `message` - Mô tả kết quả
- `data` - Dữ liệu trả về

---

## 🚀 Hướng Dẫn Phát Triển

### Quy Trình Làm Việc
1. **Tiếp nhận ngữ cảnh** - Đọc tài liệu trong `/documents` trước khi code
2. **Xác nhận thiết kế** - Kiểm tra file `03` (Database) & `04` (API) trước khi thay đổi
3. **Xử lý Backend trước** - Viết API/Model trước, sau đó cập nhật UI
4. **Kiểm chứng** - Đảm bảo Soft Delete và JWT check cho tất cả chức năng

### Thuật Ngữ Quan Trọng (Glossary)

| Thuật ngữ | Ý nghĩa |
|-----------|---------|
| **Soft Delete** | Đánh dấu bản ghi xóa (`deleted: true`) thay vì xóa vật lý |
| **RBAC** | Role-Based Access Control - Phân quyền theo vai trò |
| **Slug** | Chuỗi URL thân thiện, VD: `hoc-javascript-co-ban` |
| **Populate** | Kỹ thuật Mongoose để lấy dữ liệu liên kết (Join) |
| **Bearer Token** | JWT token dùng để xác thực API requests |

## Screenshot

![Dashboard](./screenshot/dashboard.png)
![Login](./screenshot/login.png)
![Home](./screenshot/home.png)



---

**📅 Cập nhật lần cuối:** 25-04-2026