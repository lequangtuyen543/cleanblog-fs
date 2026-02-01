import { NavLink } from "react-router-dom";
import { Button, Space } from "antd";
import { getCookie } from "../../helpers/cookie";
import { useSelector } from "react-redux";
import { UserOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

export const Header = (props) => {
  const { collapsed, setCollapsed } = props;
  const token = getCookie("token");
  const isLogin = useSelector(state => state.loginReducer);

  return (
    <>
      <header className={collapsed ? "header header--collapsed" : "header"}>
        <div className="header-container">
          <div className="logo">
            <NavLink to="/admin/dashboard">
              {collapsed ? "ITA" : "IT Admin"}
            </NavLink>
          </div>
          <div className="nav-wrap">
            <Button
              type="primary"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
              }}
            />
            <div className="account">
              {token ? (
                <Space>
                  <NavLink to="/admin/user-info">
                    <Button icon={<UserOutlined />}>User Info</Button>
                  </NavLink>
                  <NavLink to="/logout">
                    <Button icon={<LogoutOutlined />}>Logout</Button>
                  </NavLink>
                </Space>
              ) : (<Space>
                <NavLink to="/login">
                  <Button icon={<LoginOutlined />}>Login</Button>
                </NavLink>
                <NavLink to="/register">
                  <Button type="primary" icon={<UserAddOutlined />}>Register</Button>
                </NavLink>
              </Space>)}
            </div >
          </div>
        </div >
      </header >
    </>
  );
}