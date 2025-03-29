import { useState } from "react";
import { Layout, Menu, Button, Space, Input } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  LoginOutlined,
  PlayCircleOutlined,
  BookOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const [selectedKeys, setSelectedKeys] = useState([location.pathname]);

  const handleMenuClick = (key) => {
    setSelectedKeys([key]); // Update selected key
  };

  const menuItemSelectedColor = "#ff6b81"; // Change to your desired color
  const menuItemSelectedBackground = "#2a1d25"; // Background color for selected item

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        background: "#412C3A",
        padding: "0 24px",
        boxShadow: "none",
      }}
    >
      <Menu
        mode="horizontal"
        theme="dark"
        selectedKeys={selectedKeys}
        onClick={(e) => handleMenuClick(e.key)}
        style={{
          flex: 2,
          border: "none",
          background: "transparent",
          color: "white",
        }}
      >
        <Menu.Item
          key="/"
          icon={
            <HomeOutlined
              style={{
                color: selectedKeys.includes("/")
                  ? menuItemSelectedColor
                  : "white",
              }}
            />
          }
          style={{
            background: selectedKeys.includes("/") ? menuItemSelectedBackground : "transparent",
          }}
        >
          <Link
            to="/"
            style={{
              color: selectedKeys.includes("/") ? menuItemSelectedColor : "white",
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
                color: selectedKeys.includes("/discover")
                  ? menuItemSelectedColor
                  : "white",
              }}
            />
          }
          style={{
            background: selectedKeys.includes("/discover") ? menuItemSelectedBackground : "transparent",
          }}
        >
          <span
            style={{
              color: selectedKeys.includes("/discover")
                ? menuItemSelectedColor
                : "white",
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
                color: selectedKeys.includes("/albums")
                  ? menuItemSelectedColor
                  : "white",
              }}
            />
          }
          style={{
            background: selectedKeys.includes("/albums") ? menuItemSelectedBackground : "transparent",
          }}
        >
          <span
            style={{
              color: selectedKeys.includes("/albums")
                ? menuItemSelectedColor
                : "white",
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
                color: selectedKeys.includes("/artists")
                  ? menuItemSelectedColor
                  : "white",
              }}
            />
          }
          style={{
            background: selectedKeys.includes("/artists") ? menuItemSelectedBackground : "transparent",
          }}
        >
          <span
            style={{
              color: selectedKeys.includes("/artists")
                ? menuItemSelectedColor
                : "white",
            }}
          >
            Artists
          </span>
        </Menu.Item>
      </Menu>
      <Space style={{ flex: 1, justifyContent: "flex-end" }}>
        <Input
          prefix={
            <SearchOutlined style={{ color: "rgba(255, 255, 255, 0.85)" }} />
          }
          placeholder="Search..."
          style={{
            width: 200,
            background: "rgba(255, 255, 255, 0.2)",
            color: "white",
            border: "none",
          }}
        />
        <Button
          type="primary"
          icon={<LoginOutlined />}
          onClick={() => navigate("/login")}
          style={{ backgroundColor: "#ff6b81", borderColor: "#ff6b81" }}
        >
          Login
        </Button>
        <Button
          onClick={() => navigate("/register")}
          style={{
            color: "white",
            borderColor: "#ff6b81",
            background: "transparent",
          }}
        >
          Register
        </Button>
      </Space>
    </Header>
  );
};

export default Navbar;
