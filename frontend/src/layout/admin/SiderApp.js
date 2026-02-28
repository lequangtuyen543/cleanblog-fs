import { BookOutlined, DashboardOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
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
      label: <Link to="/admin/users">Users List</Link>,
      icon: <UsergroupAddOutlined />,
    },
    {
      key: 'blogs',
      label: <Link to="/admin/blogs">Blogs List</Link>,
      icon: <BookOutlined />,
    },
    {
      key: 'roles',
      label: <Link to="/admin/roles">Roles List</Link>,
      icon: <BookOutlined />,
    },
    {
      key: 'roles-permissions',
      label: <Link to="/admin/roles/permissions-multi">Roles Permissions</Link>,
      icon: <BookOutlined />,
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