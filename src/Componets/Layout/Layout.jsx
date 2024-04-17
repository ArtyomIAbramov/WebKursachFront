import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom"
import {
  CaretRightOutlined,
  CaretLeftOutlined,
  LoginOutlined,
  CarFilled,
  ContactsOutlined,
  TeamOutlined,
  DollarOutlined,
  LogoutOutlined,
  FrownOutlined,
} from '@ant-design/icons';

import { Layout, Menu, Button, theme } from 'antd';
const { Header, Sider, Content } = Layout;

const LayoutApt = ({user}) => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <LoginOutlined />,
              label: <Link to="/login">Вход</Link>
            },
            {
              key: '2',
              icon: <CarFilled/>,
              label: <Link to="/cars">Автомобили</Link>
            },
            {
              key: '3',
              icon: <ContactsOutlined/>,
              label: <Link to="/clients">Клиенты</Link>,
              style: {display: user.isAuthenticated ? "block" : "none"}
            },
            {
              key: '4',
              icon: <TeamOutlined/>,
              label: <Link to="/employee">Работники</Link>,
              style: {display: user.isAuthenticated ? "block" : "none"}
            },
            {
              key: '5',
              icon: <DollarOutlined/>,
              label: <Link to="/order">Заказы</Link>
            },
            {
              key: '6',
              icon: <LogoutOutlined />,
              label: <Link to="/logoff">Выход</Link>
            },
            {
              key: '7',
              icon: <FrownOutlined />,
              label: <Link to="/register">Регистрация</Link>
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <CaretRightOutlined /> : <CaretLeftOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutApt;
