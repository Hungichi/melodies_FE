import { Layout, Menu } from 'antd';
import { Outlet } from 'react-router-dom';
import {
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <DashboardOutlined />,
                            label: 'Dashboard',
                        },
                        {
                            key: '2',
                            icon: <UserOutlined />,
                            label: 'Users',
                        },
                        {
                            key: '3',
                            icon: <SettingOutlined />,
                            label: 'Settings',
                        },
                    ]}
                />
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
                <Header style={{ padding: 0, background: '#fff' }}>
                    <div style={{ padding: '0 24px', fontSize: '18px', fontWeight: 'bold' }}>
                        Admin Dashboard
                    </div>
                </Header>
                <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
