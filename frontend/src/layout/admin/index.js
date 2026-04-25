import { SiderApp } from "./SiderApp";
import { Header } from "./Header";
import { Main } from "./Main";
import './LayoutAdmin.scss'
import { Layout } from 'antd';
import { useState } from "react";
import Footer from "./Footer";

const { Sider, Content } = Layout;

export const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="min-h-screen">
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
        className="shadow-lg z-10"
        width={260}
      >
        <div className="p-4 flex items-center justify-center">
          <span className="text-xl font-bold text-indigo-600 truncate">
            {collapsed ? 'CB' : 'Clean Blog Admin'}
          </span>
        </div>
        <SiderApp />
      </Sider>
      
      <Layout className="bg-gray-50">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        
        <Content className="m-6 p-6 bg-white rounded-xl shadow-sm min-h-[280px]">
          <Main />
        </Content>
        
        <Footer />
      </Layout>
    </Layout>
  );
}