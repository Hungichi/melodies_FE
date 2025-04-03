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
