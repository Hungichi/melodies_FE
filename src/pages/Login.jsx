import { Form, Input, Button, Card, Typography } from "antd"
import { UserOutlined, LockOutlined, GoogleOutlined, FacebookOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"

const { Title, Text } = Typography

const Login = () => {
  const onFinish = (values) => {
    console.log("Success:", values)
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 64px)",
        background: "linear-gradient(135deg, #1a1221 0%, #2D1F31 100%)",
      }}
    >
      <Card
        style={{
          width: 400,
          background: "linear-gradient(135deg, #3d2a3a 0%, #4d3649 100%)",
          borderRadius: "24px",
          border: "none",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4), 0 0 20px rgba(255, 31, 156, 0.15)",
        }}
        bodyStyle={{ padding: 0 }}
      >
        {/* Top section with logo and login form */}
        <div style={{ padding: "40px 24px 20px" }}>
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div
              style={{
                position: "relative",
                width: "96px",
                height: "96px",
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #ff1f9c 0%, #ff4db2 100%)",
                  opacity: 0.3,
                  filter: "blur(10px)",
                }}
              ></div>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  border: "2px solid #ff1f9c",
                  boxShadow: "0 0 15px rgba(255, 31, 156, 0.5)",
                  background: "rgba(77, 54, 73, 0.5)",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <span
                    style={{
                      fontSize: "28px",
                      color: "#42c6ff",
                      textShadow: "0 0 10px rgba(66, 198, 255, 0.7)",
                    }}
                  >
                    ♪
                  </span>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#42c6ff",
                      fontWeight: "bold",
                      textShadow: "0 0 5px rgba(66, 198, 255, 0.7)",
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
                color: "#ff1f9c",
                marginTop: 16,
                marginBottom: 40,
                fontWeight: "bold",
                textShadow: "0 0 10px rgba(255, 31, 156, 0.5)",
              }}
            >
              Melodies
            </Title>
          </div>

          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <Title
              level={3}
              style={{
                color: "white",
                margin: 0,
                fontWeight: "bold",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              Login To Continue
            </Title>
          </div>

          <Form name="login" onFinish={onFinish} layout="vertical">
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "rgba(255, 255, 255, 0.8)" }} />}
                placeholder="E-Mail"
                size="large"
                style={{
                color:"white",
                  backgroundColor: "rgba(91, 73, 89, 0.7)",
                  borderRadius: "24px",
                  height: "56px",
                  border: "1px solid rgba(255, 31, 156, 0.3)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "rgba(255, 255, 255, 0.8)" }} />}
                placeholder="Password"
                size="large"
                style={{
                  backgroundColor: "rgba(91, 73, 89, 0.7)",
                  borderRadius: "24px",
                  height: "56px",
                  border: "1px solid rgba(255, 31, 156, 0.3)",
                  color: "white",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link
                  to="/forgot-password"
                  style={{
                    color: "rgba(255, 255, 255, 0.9)",
                    fontSize: "14px",
                    textDecoration: "none",
                    fontWeight: "500",
                    transition: "color 0.3s ease",
                    ":hover": {
                      color: "#ff1f9c",
                    },
                  }}
                >
                  Forgot password
                </Link>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  style={{
                    borderRadius: "24px",
                    background: "linear-gradient(135deg, #ff1f9c 0%, #ff4db2 100%)",
                    minWidth: "100px",
                    fontWeight: "bold",
                    border: "none",
                    boxShadow: "0 4px 10px rgba(255, 31, 156, 0.4)",
                    transition: "all 0.3s ease",
                  }}
                >
                  Login
                </Button>
              </div>
            </Form.Item>

            <div style={{ marginTop: 40, marginBottom: 24 }}>
              <Button
                icon={<GoogleOutlined style={{ fontSize: "18px" }} />}
                block
                size="large"
                style={{
                  marginBottom: 16,
                  borderRadius: "24px",
                  height: "48px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  color: "white",
                  fontWeight: "500",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                  transition: "all 0.3s ease",
                }}
              >
                Google Login
              </Button>

              <Button
                icon={<FacebookOutlined style={{ fontSize: "20px" }} />}
                block
                size="large"
                style={{
                  borderRadius: "24px",
                  height: "48px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  color: "white",
                  fontWeight: "500",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                  transition: "all 0.3s ease",
                }}
              >
                Facebook Login
              </Button>
            </div>
          </Form>
        </div>

        {/* Bottom section with sign up */}
        <div
          style={{
            background: "linear-gradient(135deg, #332433 0%, #3d2a3a 100%)",
            padding: "40px 24px 24px",
            textAlign: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <Title
            level={4}
            style={{
              color: "white",
              margin: 0,
              fontWeight: "bold",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Dont Have An Account
          </Title>
          <Text
            style={{
              color: "rgba(255, 255, 255, 0.9)",
              display: "block",
              marginBottom: 16,
              fontSize: "16px",
            }}
          >
            Sign Up Here
          </Text>
          <Link to="/register">
          <Button
            type="primary"
            size="large"
            style={{
              borderRadius: "24px",
              background: "linear-gradient(135deg, #0099ff 0%, #33b1ff 100%)",
              minWidth: "120px",
              fontWeight: "bold",
              border: "none",
              boxShadow: "0 4px 10px rgba(0, 153, 255, 0.4)",
              transition: "all 0.3s ease",
            }}
          >
            Sign Up
          </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default Login

