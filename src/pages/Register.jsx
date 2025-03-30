import { Card, Typography, Input, Button } from "antd";
import { UserOutlined, MailOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const { Title, Text } = Typography;

const Register = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please input your name!"),
    email: Yup.string().email("Invalid email format").required("Please input your email!"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Please input your password!"),
    phone: Yup.string().matches(/^[0-9]{10,15}$/, "Invalid phone number").required("Please input your phone number!"),
  });

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "linear-gradient(135deg, #1a1221 0%, #2D1F31 100%)" }}>
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
        <div style={{ padding: "40px 24px 20px", textAlign: "center" }}>
          <Title level={3} style={{ color: "#ff1f9c", fontWeight: "bold", textShadow: "0 0 10px rgba(255, 31, 156, 0.5)" }}>Melodies</Title>
          <Title level={3} style={{ color: "white", margin: 0, fontWeight: "bold" }}>Create an Account</Title>
        </div>

        <Formik
          initialValues={{ name: "", email: "", password: "", phone: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => console.log("Register Data:", values)}
        >
          {({ handleSubmit }) => (
            <Form style={{ padding: "0 24px" }} onSubmit={handleSubmit}>
              {fields.map(({ name, placeholder, icon }) => (
                <div key={name} style={{ marginBottom: "16px" }}>
                  <Field name={name}>
                    {({ field }) => (
                      <Input {...field} prefix={icon} placeholder={placeholder} size="large" style={inputStyle} />
                    )}
                  </Field>
                  <ErrorMessage name={name} component="div" style={errorStyle} />
                </div>
              ))}

              <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
                <Button type="primary" htmlType="submit" size="large" style={buttonStyle}>
                  Sign Up
                </Button>
              </div>
            </Form>
          )}
        </Formik>

        <div style={{ background: "linear-gradient(135deg, #332433 0%, #3d2a3a 100%)", padding: "40px 24px 24px", textAlign: "center" }}>
          <Title level={4} style={{ color: "white", margin: 0, fontWeight: "bold" }}>Already Have An Account?</Title>
          <Text style={{ color: "rgba(255, 255, 255, 0.9)", display: "block", marginBottom: 16, fontSize: "16px" }}>Login Here</Text>
          <Link to="/login">
            <Button type="primary" size="large" style={loginButtonStyle}>
              Login
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

const fields = [
  { name: "name", placeholder: "Name", icon: <UserOutlined style={{ color: "rgba(255, 255, 255, 0.8)" }} /> },
  { name: "email", placeholder: "E-Mail", icon: <MailOutlined style={{ color: "rgba(255, 255, 255, 0.8)" }} /> },
  { name: "password", placeholder: "Password", icon: <LockOutlined style={{ color: "rgba(255, 255, 255, 0.8)" }} /> },
  { name: "phone", placeholder: "Phone Number", icon: <PhoneOutlined style={{ color: "rgba(255, 255, 255, 0.8)" }} /> },
];

const inputStyle = {
  color: "white",
  backgroundColor: "rgba(91, 73, 89, 0.7)",
  borderRadius: "24px",
  height: "56px",
  border: "1px solid rgba(255, 31, 156, 0.3)",
};

const errorStyle = {
  color: "#ff4db2",
  fontSize: "12px",
  marginTop: 4,
};

const buttonStyle = {
  borderRadius: "24px",
  background: "linear-gradient(135deg, #ff1f9c 0%, #ff4db2 100%)",
  fontWeight: "bold",
  border: "none",
};

const loginButtonStyle = {
  borderRadius: "24px",
  background: "linear-gradient(135deg, #0099ff 0%, #33b1ff 100%)",
  fontWeight: "bold",
  border: "none",
};

export default Register;
