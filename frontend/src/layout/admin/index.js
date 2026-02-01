import { SiderApp } from "./SiderApp";
import { Header } from "./Header";
import { Main } from "./Main";
import './LayoutAdmin.scss'
import { Flex, Layout } from 'antd';
import { useState } from "react";

const { Sider, Content } = Layout;

export const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <div className="layout-admin">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout>
          <Sider theme="light" className="sider"
          collapsed={collapsed}>
            <SiderApp />
          </Sider>
          <Content>
            <Main />
          </Content>
        </Layout>
      </div>
    </>
  );
}