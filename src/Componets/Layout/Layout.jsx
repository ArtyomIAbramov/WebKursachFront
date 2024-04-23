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
          defaultSelectedKeys={['8']}
          items={[
            {
              key: '1',
              icon: <LoginOutlined />,
              label: <Link to="/login" >Вход</Link>,
              style: {display: user.isAuthenticated ? "none" : "block"},
            },
            {
              key: '2',
              icon: <CarFilled/>,
              label: user.userRole === "admin" ? <Link to="/cars">В наличии</Link> : <Link to="/cars">Автомобили</Link>
            },
            {
              key: '3',
              icon: <CarFilled/>,
              style: {display: user.userRole === "admin" ? "block" : "none"},
              label: <Link to="/allCars">Все автомобили</Link>,
            },
            {
              key: '4',
              icon: <CarFilled/>,
              style: {display: user.userRole === "admin" ? "block" : "none"},
              label: <Link to="/soldCars">Проданные автомобили</Link>
            },
            {
              key: '5',
              icon: <ContactsOutlined/>,
              label: <Link to="/clients">Клиенты</Link>,
              style: {display: user.isAuthenticated && user.userRole === "admin" ? "block" : "none"}
            },
            {
              key: '6',
              icon: <TeamOutlined/>,
              label: <Link to="/employee">Работники</Link>,
              style: {display: user.isAuthenticated && user.userRole === "admin" ? "block" : "none"}
            },
            {
              key: '7',
              icon: <DollarOutlined/>,
              label: <Link to="/order">Заказы</Link>,
              style: {display: user.isAuthenticated? "block" : "none"}
            },
            {
              key: '8',
              icon: <LogoutOutlined />,
              label: <Link to="/logoff">Выход</Link>,
              style: {display: user.isAuthenticated ? "block" : "none"}
            },
            {
              key: '9',
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
          }}>
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
          }}>
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutApt;
