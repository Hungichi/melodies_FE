import { Form, Input, Button, Card, Typography, Divider, message } from 'antd';
import { MailOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await authService.login({
        email: values.email,
        password: values.password
      });
      
      message.success({
        content: 'Login successful! Welcome back.',
        duration: 3,
        style: {
          marginTop: '20vh',
        },
      });
      
      // Đợi 2 giây để user đọc thông báo
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      message.error({
        content: error.message || 'Login failed. Please try again.',
        duration: 3,
        style: {
          marginTop: '20vh',
        },
      });
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: 'calc(100vh - 64px)',
      background: '#f0f2f5'
    }}>
      <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2}>Welcome Back</Title>
          <Text type="secondary">Sign in to continue listening</Text>
        </div>

        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Email" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              size="large"
            >
              Sign In
            </Button>
          </Form.Item>

          <Divider>Or</Divider>

          <Button 
            icon={<GoogleOutlined />} 
            block 
            size="large"
            style={{ marginBottom: 16 }}
          >
            Continue with Google
          </Button>

          <div style={{ textAlign: 'center' }}>
            <Text type="secondary">Don't have an account? </Text>
            <Link to="/register">
              <Text type="primary">Sign up</Text>
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;

