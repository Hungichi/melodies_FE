import { Layout, Menu, Button, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { HomeOutlined, UserOutlined, LoginOutlined, PlayCircleOutlined, BookOutlined } from '@ant-design/icons';

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Header style={{
      display: 'flex',
      alignItems: 'center',
      background: '#001529', 
      padding: '0 24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <div style={{ flex: 1 }}>
        <Link to="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>
          Melodies
        </Link>
      </div>
      <Menu 
        mode="horizontal" 
        theme="dark"  
        style={{ flex: 2, border: 'none', background: 'transparent' }}
      >
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="playlists" icon={<PlayCircleOutlined />}>
          Discover
        </Menu.Item>
        <Menu.Item key="albums" icon={<BookOutlined />}>
          Albums
        </Menu.Item>
        <Menu.Item key="artists" icon={<UserOutlined />}>
          Artists
        </Menu.Item>
      </Menu>
      <Space style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Button type="primary" icon={<LoginOutlined />} onClick={() => navigate('/login')}>
          Login
        </Button>
        <Button onClick={() => navigate('/register')}>
          Register
        </Button>
      </Space>
    </Header>
  );
};

export default Navbar;
