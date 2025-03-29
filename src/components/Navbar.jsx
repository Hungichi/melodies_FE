import { useState } from 'react';
import { Layout, Menu, Button, Space, Input } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  UserOutlined,
  LoginOutlined,
  PlayCircleOutlined,
  BookOutlined,
  SearchOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState('login');
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([location.pathname]);

  const handleMenuClick = (key) => {
    setSelectedKeys([key]);
  };

  const menuItemSelectedColor = '#ff6b81';
  const menuItemSelectedBackground = '#2a1d25';

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        background: '#412C3A',
        padding: '0 24px',
        boxShadow: 'none',
      }}
    >
      <Menu
        mode="horizontal"
        theme="dark"
        selectedKeys={selectedKeys}
        onClick={(e) => handleMenuClick(e.key)}
        style={{
          flex: 2,
          marginTop: "12px",
          border: 'none',
          background: 'transparent',
          color: 'white',
        }}
      >
        <Menu.Item
          key="/"
          icon={
            <HomeOutlined
              style={{
                color: selectedKeys.includes('/')
                  ? menuItemSelectedColor
                  : 'white',
              }}
            />
          }
          style={{
            background: selectedKeys.includes('/')
              ? menuItemSelectedBackground
              : 'transparent',
            borderRadius: "10px"

          }}
        >
          <Link
            to="/"
            style={{
              color: selectedKeys.includes('/')
                ? menuItemSelectedColor
                : 'white',
            }}
          >
            Home
          </Link>
        </Menu.Item>

        <Menu.Item
          key="/discover"
          icon={
            <PlayCircleOutlined
              style={{
                color: selectedKeys.includes('/discover')
                  ? menuItemSelectedColor
                  : 'white',
              }}
            />
          }
          style={{
            background: selectedKeys.includes('/discover')
              ? menuItemSelectedBackground
              : 'transparent',
            borderRadius: "10px"

          }}
        >
          <span
            style={{
              color: selectedKeys.includes('/discover')
                ? menuItemSelectedColor
                : 'white',
            }}
          >
            Discover
          </span>
        </Menu.Item>

        <Menu.Item
          key="/albums"
          icon={
            <BookOutlined
              style={{
                color: selectedKeys.includes('/albums')
                  ? menuItemSelectedColor
                  : 'white',
              }}
            />
          }
          style={{
            background: selectedKeys.includes('/albums')
              ? menuItemSelectedBackground
              : 'transparent',
            borderRadius: "10px"

          }}
        >
          <span
            style={{
              color: selectedKeys.includes('/albums')
                ? menuItemSelectedColor
                : 'white',
            }}
          >
            Albums
          </span>
        </Menu.Item>

        <Menu.Item
          key="/artists"
          icon={
            <UserOutlined
              style={{
                color: selectedKeys.includes('/artists')
                  ? menuItemSelectedColor
                  : 'white',
              }}
            />
          }
          style={{
            background: selectedKeys.includes('/artists')
              ? menuItemSelectedBackground
              : 'transparent',
            borderRadius: "10px"

          }}
        >
          <span
            style={{
              color: selectedKeys.includes('/artists')
                ? menuItemSelectedColor
                : 'white',
            }}
          >
            Artists
          </span>
        </Menu.Item>
      </Menu>
      <Space style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Input
          prefix={
            <SearchOutlined
              style={{ color: 'rgba(255, 255, 255, 0.85)' }}
            />
          }
          placeholder="Search..."
          style={{
            width: 200,
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: 'none',
          }}
        />
        <Button
          type="primary"
          icon={<LoginOutlined />}
          onClick={() => {
            setActive('login');
            navigate('/login');
          }}
          style={{
            backgroundColor:
              active === 'login' ? '#ff6b81' : 'transparent',
            borderColor: '#ff6b81',
            color: active === 'login' ? 'white' : '#ff6b81',
          }}
        >
          Login
        </Button>
        <Button
          onClick={() => {
            setActive('register');
            navigate('/register');
          }}
          style={{
            backgroundColor:
              active === 'register' ? '#ff6b81' : 'transparent',
            borderColor: '#ff6b81',
            color: active === 'register' ? 'white' : '#ff6b81',
          }}
        >
          Register
        </Button>
      </Space>
    </Header>
  );
};

export default Navbar;
