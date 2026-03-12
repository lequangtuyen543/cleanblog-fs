import { NavLink } from "react-router-dom";
import { Button, Space, Dropdown, Avatar } from "antd";
import {
  UserOutlined, LogoutOutlined, MenuUnfoldOutlined, MenuFoldOutlined, SettingOutlined, CreditCardOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from "react";
import { usersInfo } from "../../services/usersService";

export const Header = (props) => {
  const { collapsed, setCollapsed } = props;
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await usersInfo();
      if (res) {
        setData(res.data);
      }
    };
    fetchData();
  }, []);

  // console.log("data", data);

  const items = [
    {
      key: "info",
      disabled: true,
      label: <Space style={{ cursor: "pointer" }}>
        <Avatar src="/assets/img/profile-img.webp" />
        <div>
          <div style={{ fontWeight: 500 }}>{data?.fullName}</div>
          <div style={{ fontSize: 12, color: "#888" }}>{data?.role?.title}</div>
        </div>
      </Space>,
    },
    {
      type: "divider",
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: <NavLink to="/admin/user/profile">My Profile</NavLink>,
    },
    {
      key: "preferences",
      icon: <SettingOutlined />,
      label: <NavLink to="/admin/user/preferences">Preferences</NavLink>,
    },
    {
      key: "activity",
      icon: <UserOutlined />,
      label: "Activity Log",
    },
    {
      key: "billing",
      icon: <CreditCardOutlined />,
      label: "Billing",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: <NavLink to="/logout">Sign Out</NavLink>,
      danger: true,
    },
  ];

  return (
    <>
      <header className={collapsed ? "header header--collapsed" : "header"}>
        <div className="header-container">
          <div className="logo">
            <NavLink to="/admin/dashboard">
              {collapsed ? "NS" : "Nakaisoft"}
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
            <Dropdown
              menu={{ items, style: { minWidth: 200 } }}
              placement="bottomRight"
              trigger={["click"]}
            >
              <span style={{ cursor: "pointer" }}>
                <Avatar src="/assets/img/profile-img.webp" />
              </span>
            </Dropdown>
          </div>
        </div >
      </header >
    </>
  );
}