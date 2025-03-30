import { Form, Input, Button, Typography } from 'antd';
import { ArrowLeftOutlined, EyeInvisibleOutlined, EyeOutlined, PhoneOutlined, UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Register = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1221 0%, #2D1F31 100%)',
        padding: '20px',
      }}
    >
      {/* Back Arrow */}
      <div style={{ position: 'absolute', top: 20, left: 20 }}>
        <Link to="/">
          <ArrowLeftOutlined style={{ fontSize: '24px', color: '#42c6ff' }} />
        </Link>
      </div>

      {/* Logo Section */}
      <div style={{ padding: '40px 24px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div
            style={{
              position: 'relative',
              width: '96px',
              height: '96px',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ff1f9c 0%, #ff4db2 100%)',
                opacity: 0.3,
                filter: 'blur(10px)',
              }}
            ></div>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                border: '2px solid #ff1f9c',
                boxShadow: '0 0 15px rgba(255, 31, 156, 0.5)',
                background: 'rgba(77, 54, 73, 0.5)',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <span
                  style={{
                    fontSize: '28px',
                    color: '#42c6ff',
                    textShadow: '0 0 10px rgba(66, 198, 255, 0.7)',
                  }}
                >
                  ♪
                </span>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#42c6ff',
                    fontWeight: 'bold',
                    textShadow: '0 0 5px rgba(66, 198, 255, 0.7)',
                  }}
                >
                  Melodies
                </div>
              </div>
            </div>
          </div>
          <Title
            level={3}
            style={{
              color: '#ff1f9c',
              marginTop: 16,
              marginBottom: 40,
              fontWeight: 'bold',
              textShadow: '0 0 10px rgba(255, 31, 156, 0.5)',
            }}
          >
            Melodies
          </Title>
        </div>
      </div>

      {/* Form Title */}
      <Title
        level={3}
        style={{
          color: 'white',
          marginBottom: 40,
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
        }}
      >
        Sign In To Continue
      </Title>

      {/* Form */}
      <Form
        name="register"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input
            prefix={<UserOutlined style={{ color: 'rgba(255, 255, 255, 0.8)' }} />}
            placeholder="Name"
            size="large"
            style={{
              color: 'white',
              backgroundColor: 'rgba(91, 73, 89, 0.7)',
              borderRadius: '12px',
              height: '56px',
              border: 'none',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              padding: '0 16px',
            }}
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input
            prefix={<MailOutlined style={{ color: 'rgba(255, 255, 255, 0.8)' }} />}
            placeholder="E-Mail"
            size="large"
            style={{
              color: 'white',
              backgroundColor: 'rgba(91, 73, 89, 0.7)',
              borderRadius: '12px',
              height: '56px',
              border: 'none',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              padding: '0 16px',
            }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters!' },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: 'rgba(255, 255, 255, 0.8)' }} />}
            placeholder="Password"
            size="large"
            iconRender={(visible) =>
              visible ? (
                <EyeOutlined style={{ color: '#ff1f9c' }} />
              ) : (
                <EyeInvisibleOutlined style={{ color: '#ff1f9c' }} />
              )
            }
            style={{
              color: 'white',
              backgroundColor: 'rgba(91, 73, 89, 0.7)',
              borderRadius: '12px',
              height: '56px',
              border: 'none',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              padding: '0 16px',
            }}
          />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            { required: true, message: 'Please input your phone number!' },
            {
              pattern: /^[0-9]{10,15}$/,
              message: 'Please enter a valid phone number!',
            },
          ]}
        >
          <Input
            prefix={<PhoneOutlined style={{ color: 'rgba(255, 255, 255, 0.8)' }} />}
            placeholder="Phone Number"
            size="large"
            style={{
              color: 'white',
              backgroundColor: 'rgba(91, 73, 89, 0.7)',
              borderRadius: '12px',
              height: '56px',
              border: 'none',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              padding: '0 16px',
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            style={{
              borderRadius: '12px',
              background: '#ff1f9c',
              border: 'none',
              height: '56px',
              fontWeight: 'bold',
              boxShadow: '0 4px 10px rgba(255, 31, 156, 0.4)',
              transition: 'all 0.3s ease',
            }}
          >
            Create an account
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;