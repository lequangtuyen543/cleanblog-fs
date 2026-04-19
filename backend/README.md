# Clean Blog FS - Backend

Backend của dự án `clean-blog-fs` được xây dựng bằng Node.js, Express và TypeScript. Đây là phần API phục vụ cho frontend, quản lý xác thực, bài viết, người dùng, danh mục, vai trò và cài đặt.

## Công nghệ chính

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- dotenv
- body-parser
- cors
- nodemon
- ts-node

## Cấu trúc chính

- `index.ts` - file khởi tạo server
- `config/database.ts` - cấu hình kết nối MongoDB
- `api/v1/routes/` - định nghĩa route cho API
- `api/v1/controllers/` - xử lý logic cho route
- `api/v1/middlewares/` - middleware xác thực
- `api/v1/models/` - định nghĩa schema dữ liệu
- `api/v1/validates/` - validate dữ liệu đầu vào
- `helpers/` - các trợ giúp hỗ trợ chung

## Yêu cầu

- Node.js 18+ hoặc tương đương
- MongoDB

## Cài đặt và chạy

1. Cài dependencies:
   ```bash
   npm install
   ```

2. Tạo file `.env` trong thư mục gốc của backend và thêm các biến sau:
   ```env
   PORT=3002
   MONGODB_URL=mongodb://localhost:27017/your-db-name
   ```

3. Chạy server trong môi trường phát triển:
   ```bash
   npm start
   ```

4. Build TypeScript nếu cần:
   ```bash
   npm run build
   ```

## Các script hữu ích

- `npm start` - chạy server bằng `nodemon` với file `index.ts`
- `npm run build` - xóa thư mục `dist` và biên dịch TypeScript
- `npm run ts.check` - kiểm tra TypeScript bằng `tsc`

## Base URL

Tất cả API đều bắt đầu với prefix:

```
/api/v1
```

## API Endpoints

### Auth

- `POST /api/v1/auth/register` - đăng ký người dùng
- `POST /api/v1/auth/login` - đăng nhập và nhận token

### Posts

- `GET /api/v1/posts` - lấy danh sách bài viết
- `GET /api/v1/posts/detail/:id` - lấy chi tiết bài viết
- `POST /api/v1/posts/create` - tạo bài viết mới (yêu cầu auth)
- `PATCH /api/v1/posts/edit/:id` - chỉnh sửa bài viết (yêu cầu auth)
- `DELETE /api/v1/posts/delete/:id` - xóa bài viết (yêu cầu auth)

### Users

- `GET /api/v1/users` - lấy danh sách người dùng (yêu cầu auth)
- `GET /api/v1/users/info` - lấy thông tin người dùng hiện tại (yêu cầu auth)
- `PATCH /api/v1/users/edit/:id` - cập nhật người dùng (yêu cầu auth)
- `PATCH /api/v1/users/change-password` - đổi mật khẩu (yêu cầu auth)

### Categories

- `GET /api/v1/categories` - lấy danh sách danh mục
- `POST /api/v1/categories` - tạo danh mục mới (yêu cầu auth)
- `PATCH /api/v1/categories/:id` - cập nhật danh mục (yêu cầu auth)
- `DELETE /api/v1/categories/:id` - xóa danh mục (yêu cầu auth)

### Roles

- `GET /api/v1/roles` - lấy danh sách vai trò (yêu cầu auth)
- `POST /api/v1/roles` - tạo vai trò mới (yêu cầu auth)
- `PATCH /api/v1/roles/:id` - cập nhật vai trò (yêu cầu auth)
- `DELETE /api/v1/roles/:id` - xóa vai trò (yêu cầu auth)

### Settings

- `GET /api/v1/settings` - lấy cài đặt hệ thống (yêu cầu auth)
- `PATCH /api/v1/settings` - tạo hoặc cập nhật cài đặt (yêu cầu auth)

## Ghi chú

- Backend sử dụng `body-parser` để parse JSON và `cors` để cho phép truy cập từ frontend.
- Các route cần bảo mật đều dùng middleware `requireAuth`.
- Kết nối MongoDB lấy từ biến môi trường `MONGODB_URL`.

## Đóng góp

Nếu bạn muốn đóng góp, vui lòng mở issue hoặc gửi pull request với các cải tiến.
