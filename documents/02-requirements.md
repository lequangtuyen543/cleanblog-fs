# 📋 Yêu Cầu Hệ Thống  
## Blog Management System

---

## 1. Giới Thiệu

Tài liệu này mô tả các yêu cầu chức năng và phi chức năng của Hệ Thống Quản Lý Bài Viết.

Mục tiêu của tài liệu nhằm đảm bảo:
- Hệ thống được xây dựng đúng mục tiêu
- Không thiếu chức năng quan trọng
- Hạn chế thay đổi lớn trong quá trình lập trình

---

# 2. Yêu Cầu Chức Năng (Functional Requirements)

## 2.1. Xác Thực Người Dùng (Auth)

### FR-01: Đăng ký tài khoản (Register)
- Người dùng có thể tạo tài khoản mới.
- Hệ thống phải kiểm tra username và email không trùng lặp.
- Mật khẩu phải được mã hóa (md5) trước khi lưu vào database.

### FR-02: Đăng nhập (Login)
- Người dùng có thể đăng nhập bằng username và mật khẩu.
- Nếu thông tin hợp lệ, hệ thống trả về JWT token.
- Nếu sai thông tin, hiển thị thông báo lỗi phù hợp.


### FR-03: Phân quyền (ChangeRole)
- Hệ thống phải hỗ trợ ít nhất 2 vai trò:
  - Admin
  - User
- Admin có quyền quản lý toàn bộ bài viết.
- User chỉ được quản lý bài viết của mình.

---

## 2.2. Quản Lý Bài Viết (Posts)

### FR-04: Tạo bài viết (Create)
- Người dùng đã đăng nhập có thể tạo bài viết.
- Bài viết bao gồm: tiêu đề, nội dung...
- Bài viết được gắn với tác giả (authorId).

### FR-05: Xem danh sách bài viết (Index)
- Người dùng và khách có thể xem danh sách bài viết chưa bị xóa.
- Có thể hỗ trợ tìm kiếm theo tiêu đề.

### FR-06: Xem chi tiết bài viết (Detail)
- Người dùng có thể xem nội dung đầy đủ của một bài viết.

### FR-07: Chỉnh sửa bài viết (Edit)
- User chỉ được chỉnh sửa bài viết của mình.
- Admin có thể chỉnh sửa mọi bài viết.

### FR-08: Xóa bài viết (Delete)
- Hệ thống không xóa dữ liệu khỏi database.
- Chỉ cập nhật trạng thái `deleted = true`.

---

## 2.3. Quản Lý Người Dùng (Users)

### FR-09: Xem danh sách người dùng (Index)
- Chỉ Admin được phép xem danh sách tất cả người dùng.
- Danh sách hiển thị các thông tin cơ bản: tên, email, vai trò, trạng thái.
- Có thể hỗ trợ tìm kiếm theo email hoặc tên.

### FR-10: Xem chi tiết người dùng (Detail)
- Admin có thể xem thông tin chi tiết của một người dùng.
- User có thể xem thông tin cá nhân của chính mình.

### FR-11: Cập nhật thông tin người dùng (Edit)
- User có thể cập nhật thông tin cá nhân (ví dụ: tên).
- Không cho phép User tự thay đổi vai trò.
- Admin có thể cập nhật thông tin và vai trò của người dùng khác.

### FR-12: Thay đổi mật khẩu (ChangePassword)
- Người dùng đã đăng nhập có thể thay đổi mật khẩu.
- Phải xác thực mật khẩu cũ trước khi đổi.
- Mật khẩu mới phải được mã hóa trước khi lưu.

### FR-13: Vô hiệu hóa tài khoản (ChangeStatus)
- Admin có thể vô hiệu hóa tài khoản người dùng.
- Không xóa dữ liệu khỏi database.
- Tài khoản bị vô hiệu hóa không thể đăng nhập.
- Cập nhật trạng thái status = inactive.

---

# 3. Yêu Cầu Phi Chức Năng (Non-Functional Requirements)

## 3.1. Bảo Mật
- Mật khẩu phải được mã hóa (md5).
- API bảo vệ bằng JWT.
- Các route nhạy cảm phải yêu cầu xác thực.

## 3.2. Hiệu Năng
- Thời gian phản hồi API không quá 2 giây trong điều kiện bình thường.
- Hệ thống phải xử lý tối thiểu 50 người dùng đồng thời (mức mô phỏng).

## 3.3. Khả Năng Mở Rộng
- Cấu trúc dự án phải rõ ràng, dễ thêm tính năng.
- Tách riêng controller, model, route.

## 3.4. Khả Năng Bảo Trì
- Code phải có cấu trúc sạch.
- Tên biến, hàm rõ ràng.
- Có xử lý lỗi tập trung.

---

# 4. Phạm Vi Hệ Thống

## 4.1. Bao Gồm
- CRUD bài viết
- Đăng ký, đăng nhập
- Phân quyền
- Giao diện cơ bản

## 4.2. Không Bao Gồm (Giai đoạn hiện tại)
- Bình luận bài viết
- Upload hình ảnh
- Hệ thống thông báo
- Thanh toán

---

# 5. Giả Định & Ràng Buộc

## 5.1. Giả Định
- Người dùng có kết nối internet ổn định.
- Hệ thống chạy trên môi trường NodeJS.

## 5.2. Ràng Buộc
- Sử dụng MongoDB làm cơ sở dữ liệu.
- Backend sử dụng ExpressJS.
- Frontend sử dụng ReactJS.

---

# 6. Tiêu Chí Hoàn Thành (Acceptance Criteria)

Hệ thống được xem là hoàn thành khi:

- Người dùng có thể đăng ký và đăng nhập thành công.
- JWT hoạt động chính xác.
- User không thể chỉnh sửa bài viết của người khác.
- Admin có thể quản lý toàn bộ bài viết.
- Các chức năng CRUD hoạt động ổn định.
- Không có lỗi nghiêm trọng trong luồng chính.

---

Tác giả: [Lê Quang Tuyến]  
Phiên bản: 1.0  
Trạng thái: Giai đoạn phân tích & thiết kế
