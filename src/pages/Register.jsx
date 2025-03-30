import { Form, Input, Button, Card, Typography, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const { Title, Text } = Typography;

const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await authService.register({
        username: values.username,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirm
      });
      
      message.success({
        content: 'Registration successful! Welcome to Melodies.',
        duration: 3,
        style: {
          marginTop: '20vh',
        },
      });
      
      // Đợi 2 giây để user đọc thông báo
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      message.error({
        content: error.message || 'Registration failed. Please try again.',
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
          <Title level={2}>Create Account</Title>
          <Text type="secondary">Join us to start listening</Text>
        </div>

        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Please input your username!' },
              { min: 3, message: 'Username must be at least 3 characters!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Username" 
              size="large"
            />
          </Form.Item>

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
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
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
              Sign Up
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
            <Text type="secondary">Already have an account? </Text>
            <Link to="/login">
              <Text type="primary">Sign in</Text>
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;