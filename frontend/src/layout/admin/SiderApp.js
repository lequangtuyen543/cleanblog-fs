import { UserOutlined, BookOutlined, DashboardOutlined, UsergroupAddOutlined } from '@ant-design/icons';
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
      key: 'user-list',
      label: <Link to="/admin/user-list">User List</Link>,
      icon: <UsergroupAddOutlined />,
    },
    {
      key: 'blog-list',
      label: <Link to="/admin/blog-list">Blog List</Link>,
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