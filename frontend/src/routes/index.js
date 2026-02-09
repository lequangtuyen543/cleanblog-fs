import PrivateRoutes from "../components/PrivateRoutes/index.js";
import { LayoutAdmin } from "../layout/admin/index.js";
import { LayoutClient } from "../layout/client";
import { Home } from "../pages/client/Home";
import { Login } from "../pages/client/Users/login.js";
import { Logout } from "../pages/client/Users/logout.js";
import { Register } from "../pages/client/Users/register.js";
import { Dashboard } from "../pages/admin/Dashboard";
import { Posts } from "../pages/client/Posts/index.js";
import { PostDetail } from "../pages/client/Posts/detail.js";
import { About } from "../pages/client/About/index.js";
import { Contact } from "../pages/client/Contact/index.js";
import { SamplePost } from "../pages/client/Posts/sample.js";
import { CreateUser } from "../pages/admin/Users/create.js";
import { DetailUser } from "../pages/admin/Users/detail.js";
import { BlogList } from "../pages/admin/Blog List/index.js";
import { CreateBlog } from "../pages/admin/Blog List/CreateBlog.js";
import { DetailBlog } from "../pages/admin/Blog List/DetailBlog.js";
import NotFound from "../pages/client/NotFound/index.js";
import { UserList } from "../pages/admin/Users/index.js";
import { UserInfo } from "../pages/admin/Users/info.js";

export const routes = [
  // Public layout
  {
    path: "/",
    element: <LayoutClient />,
    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "logout", element: <Logout /> },
      { path: "posts", element: <Posts /> },
      { path: "post/:id", element: <PostDetail /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "sample-post", element: <SamplePost /> },
      // 👇 404 public
      { path: "*", element: <NotFound /> },
    ],
  },

  // Admin layout (protected)
  {
    path: "/admin",
    element: <PrivateRoutes />, // chỉ bọc bảo vệ ở đây
    children: [
      {
        element: <LayoutAdmin />, // layout admin riêng
        children: [
          { path: "dashboard", element: <Dashboard /> },
          // User routes
          { path: "user-info", element: <UserInfo /> },
          // Users routes
          { path: "user-list", element: <UserList /> },
          { path: "create-user", element: <CreateUser /> },
          { path: "detail-user/:id", element: <DetailUser /> },
          { path: "blog-list", element: <BlogList /> },
          { path: "create-blog", element: <CreateBlog /> },
          { path: "detail-blog/:id", element: <DetailBlog /> },
          // thêm route admin khác ở đây
        ],
      },
    ],
  },
];

