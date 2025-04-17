import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Button, Dropdown, Input, Menu, Spin, Typography } from 'antd';
import {
    LogoutOutlined,
    SearchOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slice/authSlice';
import '../assets/css/navbar.css';
import { fetchCurrentUserProfile } from '../store/action/userAction';

const { Text } = Typography;

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, status, error } = useSelector((state) => state.auth);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        dispatch(fetchCurrentUserProfile());
    }, [dispatch]);

    useEffect(() => {
        setIsLoggedIn(!!user);
    }, [user]);

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleSearch = (value) => {
        console.log('Search value:', value);
    };

    const menu = (
        <Menu>
            <Menu.Item
                key="1"
                icon={<UserOutlined />}
                onClick={handleProfileClick}
            >
                Profile
            </Menu.Item>
            <Menu.Item
                key="2"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
            >
                Logout
            </Menu.Item>
        </Menu>
    );

    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center h-full">
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500 text-center mt-4">Error: {error}</p>;
    }

    return (
        <nav className="bg-[#5B4959] text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Input.Search
                    placeholder="Search..."
                    prefix={<SearchOutlined style={{ color: '#ff69b4' }} />}
                    allowClear
                    onSearch={handleSearch}
                    style={{
                        marginLeft: 10,
                        width: 250,
                        borderRadius: 20,
                        backgroundColor: '#fff',
                        border: '1px solid #ccc',
                        paddingLeft: 12,
                        transition: 'all 0.3s ease',
                    }}
                    className="neon-search"
                />
                <div className="flex items-center">
                    {!isLoggedIn ? (
                        <>
                            <Link to="/login">
                                <Button
                                    type="text"
                                    className="text-white hover:text-gray-300"
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button
                                    type="text"
                                    className="text-white hover:text-gray-300"
                                >
                                    Register
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <Dropdown
                            overlay={menu}
                            trigger={['hover']}
                            overlayClassName="dropdown-menu"
                        >
                            <Button
                                type="text"
                                className="flex items-center rounded-full px-3 py-1 shadow-md hover:shadow-lg transition-all"
                                style={{
                                    backgroundColor: '#e835c2',
                                    border: '1px solid rgba(255, 255, 255, 0.4)',
                                    boxShadow:
                                        '0 0 8px rgba(255, 105, 180, 0.6)',
                                }}
                            >
                                <Avatar src={user?.avatar} size="small" />
                                <Text style={{ color: 'white', marginLeft: 8 }}>
                                    {user?.username}
                                </Text>
                            </Button>
                        </Dropdown>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
