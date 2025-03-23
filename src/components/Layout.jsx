import React from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import {
  HomeOutlined,
  MusicNoteOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer } = AntLayout;

const Layout = () => {
  return (
    <AntLayout className="min-h-screen">
      <Header className="bg-white px-6 flex items-center justify-between">
        <div className="text-xl font-bold text-blue-600">Melodies</div>
        <Menu mode="horizontal" className="border-none">
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="songs" icon={<MusicNoteOutlined />}>
            <Link to="/songs">Songs</Link>
          </Menu.Item>
          <Menu.Item key="profile" icon={<UserOutlined />}>
            <Link to="/profile">Profile</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content className="p-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Outlet />
        </div>
      </Content>
      <Footer className="text-center">
        Melodies ©{new Date().getFullYear()} Created with ❤️
      </Footer>
    </AntLayout>
  );
};

export default Layout; 