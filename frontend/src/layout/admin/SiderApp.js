import { BookOutlined, DashboardOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Children } from 'react';
import { Link } from 'react-router-dom';

export const SiderApp = () => {
  const items = [
    {
      key: 'dashboard',
      label: <Link to="/admin/dashboard">Dashboard</Link>,
      icon: <DashboardOutlined />,
    },
    {
      key: 'users',
      label: "Users",
      icon: <UsergroupAddOutlined />,
      children: [
        {
          key: 'users-list',
          label: <Link to="/admin/users">Users List</Link>,
        },
        {
          key: 'users-create',
          label: <Link to="/admin/users/create">User Create</Link>,
        }
      ]
    },
    {
      key: 'blogs',
      label: "Blogs",
      icon: <BookOutlined />,
      children: [
        {
          key: 'blogs-list',
          label: <Link to="/admin/blogs">Blogs List</Link>,
        },
        {
          key: 'blogs-create',
          label: <Link to="/admin/blogs/create">Blog Create</Link>,
        }
      ]
    },
    {
      key: 'roles',
      label: "Roles",
      icon: <BookOutlined />,
      children: [
        {
          key: 'roles-list',
          label: <Link to="/admin/roles">Roles List</Link>,
        },
        {
          key: 'roles-create',
          label: <Link to="/admin/roles/create">Role Create</Link>,
        },
        {
          key: 'roles-permissions',
          label: <Link to="/admin/roles/permissions">Role Permissions</Link>,
        },
      ]
    },

  ];

  return (
    <Menu
      defaultSelectedKeys={['dashboard']}
      mode="inline"
      items={items}
    />
  );
};