# Clean Blog FS - Frontend

Frontend của dự án `clean-blog-fs` được xây dựng bằng ReactJS, sử dụng TailwindCSS và Ant Design để xây dựng giao diện. Hệ thống cung cấp giao diện chuyên nghiệp cho cả người dùng cuối (Client) và quản trị viên (Admin).

## Công nghệ chính

- **ReactJS (v19)**: Thư viện xây dựng giao diện người dùng.
- **Redux**: Quản lý trạng thái toàn cục (State Management).
- **React Router DOM**: Xử lý định tuyến ứng dụng.
- **Ant Design**: Bộ UI components mạnh mẽ.
- **TailwindCSS**: Framework CSS tiện ích để tùy chỉnh giao diện nhanh chóng.
- **Axios**: Thư viện gọi API RESTful.
- **Sass/SCSS**: Tiền xử lý CSS.

## Cấu trúc thư mục chính

- `src/pages/`: Chứa mã nguồn của các trang (Admin, Client, Auth).
- `src/components/`: Các thành phần giao diện có thể tái sử dụng.
- `src/layout/`: Định nghĩa các khung bố cục (Default Layout, Admin Layout).
- `src/services/`: Quản lý các yêu cầu HTTP/API.
- `src/routes/`: Cấu hình danh sách các đường dẫn của ứng dụng.
- `src/actions/` & `src/reducers/`: Xử lý logic Redux Store.
- `src/context/`: Quản lý context API cho các trạng thái dùng chung đơn giản.
- `src/helpers/` & `src/utils/`: Các hàm tiện ích, format dữ liệu.

## Yêu cầu

- **Node.js**: Phiên bản 18 trở lên.
- **Backend**: Đảm bảo server backend đang chạy (thông thường tại `http://localhost:3002`).

## Cài đặt và chạy

1.  **Cài đặt dependencies**:
    ```bash
    npm install
    ```

2.  **Cấu hình môi trường**:
    Tạo hoặc cập nhật file `.env` tại thư mục gốc của frontend:
    ```env
    REACT_APP_API_URL=http://localhost:3002/api/v1
    ```

3.  **Chạy ứng dụng (Development mode)**:
    ```bash
    npm start
    ```
    Ứng dụng sẽ chạy tại địa chỉ: `http://localhost:3000`

4.  **Build production**:
    ```bash
    npm run build
    ```

## Các chức năng chính

- **Client**:
    - Xem danh sách bài viết mới nhất.
    - Tìm kiếm và lọc bài viết theo danh mục.
    - Xem chi tiết nội dung bài viết.
- **Admin (Yêu cầu đăng nhập)**:
    - Quản lý bài viết: Thêm, sửa, xóa (Soft Delete).
    - Quản lý danh mục bài viết.
    - Quản lý người dùng và phân quyền (RBAC).
    - Cấu hình cài đặt website.
- **Auth**: Đăng nhập, đăng ký và bảo mật route Admin.

## Quy tắc phát triển

- **Naming**: PascalCase cho Components, camelCase cho biến/hàm.
- **Styles**: Kết hợp linh hoạt giữa Ant Design components và TailwindCSS classes.
- **API**: Luôn gọi thông qua các hàm định nghĩa trong `src/services/`.

## Đóng góp

Vui lòng tuân thủ quy trình làm việc đã đề ra trong tài liệu `PROJECT_KNOWLEDGE.md` của dự án.
