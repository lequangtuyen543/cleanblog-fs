import PrivateRoutes from "../components/PrivateRoutes/index.js";
import { LayoutAdmin } from "../layout/admin/index.js";
import { LayoutClient } from "../layout/client";
import { Home } from "../pages/client/Home";
import { Login } from "../pages/auth/login.js";
import { Logout } from "../pages/auth/logout.js";
import { Register } from "../pages/auth/register.js";
import { Dashboard } from "../pages/admin/Dashboard";
import { Posts } from "../pages/client/Posts/index.js";
import { PostDetail } from "../pages/client/Posts/detail.js";
import { About } from "../pages/client/About/index.js";
import { Contact } from "../pages/client/Contact/index.js";
import { SamplePost } from "../pages/client/Posts/sample.js";
import { CreateUser } from "../pages/admin/Users/create.js";
import { DetailUser } from "../pages/admin/Users/detail.js";
import { BlogList } from "../pages/admin/Blogs/index.js";
import { CreateBlog } from "../pages/admin/Blogs/create.js";
import { DetailBlog } from "../pages/admin/Blogs/detail.js";
import NotFound from "../pages/client/NotFound/index.js";
import { UserList } from "../pages/admin/Users/index.js";
import { UserProfile } from "../pages/admin/User/Profile.jsx";
import { LayoutAuth } from "../layout/auth/index.js";
import { RolesIndex } from "../pages/admin/Roles/index.js";
import { RolesCreate } from "../pages/admin/Roles/create.js";
import RolesPermissions from "../pages/admin/Roles/Permissions.jsx";
import { UserPreferences } from "../pages/admin/User/Preferences.jsx";

export const routes = [
  // Public layout
  {
    path: "/",
    element: <LayoutClient />,
    children: [
      { index: true, element: <Home /> },
      { path: "posts", element: <Posts /> },
      { path: "post/:id", element: <PostDetail /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "sample-post", element: <SamplePost /> },
      // 👇 404 public
      { path: "*", element: <NotFound /> },
    ],
  },

  // Auth layout riêng
  {
    path: "/",
    element: <LayoutAuth />,
    children: [
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "logout", element: <Logout /> },
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
          { path: "user/profile", element: <UserProfile /> },
          { path: "user/preferences", element: <UserPreferences /> },
          // User routes
          { path: "users", element: <UserList /> },
          { path: "users/create", element: <CreateUser /> },
          { path: "users/detail/:id", element: <DetailUser /> },
          // Blogs routes
          { path: "blogs", element: <BlogList /> },
          { path: "create-blog", element: <CreateBlog /> },
          { path: "detail-blog/:id", element: <DetailBlog /> },
          // Roles routes
          { path: "roles", element: <RolesIndex /> },
          { path: "roles/create", element: <RolesCreate /> },
          { path: "roles/permissions", element: <RolesPermissions /> },        
          // thêm route admin khác ở đây
        ],
      },
    ],
  },
];

