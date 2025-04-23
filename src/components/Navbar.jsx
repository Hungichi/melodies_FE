import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Button, Dropdown, Input, Spin, Typography } from 'antd';
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
        if (user) setIsLoggedIn(true);
        else setIsLoggedIn(false);
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

    const dropdownItems = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: 'Profile',
            onClick: handleProfileClick,
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
            onClick: handleLogout,
        },
    ];

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
                        width: 280,
                       
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
                            menu={{ items: dropdownItems }}
                            trigger={['hover']}
                            className="dropdown-menu"
                        >
                            <Button
                                type="text"
                                className="flex items-center rounded-full px-3 py-1 shadow-md hover:shadow-lg transition-all"
                                style={{
                                    backgroundColor: '#e835c2',
                                    border: '1px solid rgba(255, 255, 255, 0.4)',
                                    boxShadow: '0 0 8px rgba(255, 105, 180, 0.6)',
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
