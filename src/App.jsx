import { useState } from 'react';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { Content } from 'antd/es/layout/layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import DiscoverPage from './pages/Discover';
import ArtistProfileForm from './pages/Artist';
import ArtistRegistration from './pages/ArtistRegistration';
import Album from './pages/Album';
import AppFooter from './components/Footer';

function App() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Router>
            <Routes>
                {/* Main App Layout */}
                <Route
                    path="/*"
                    element={
                        <Layout style={{ minHeight: '100vh' }}>
                            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
                            <Layout
                                style={{
                                    marginLeft: collapsed ? 80 : 200,
                                    transition: 'margin-left 0.2s',
                                }}
                            >
                                <Navbar />
                                <Content style={{ padding: '24px', background: '#412C3A' }}>
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/register" element={<Register />} />
                                        <Route path="/profile" element={<Profile />} />
                                        <Route path="/discover" element={<DiscoverPage />} />
                                        <Route path="/album" element={<Album />} />
                                        <Route path="/artist" element={<ArtistProfileForm />} />
                                        <Route path="/artist-registration" element={<ArtistRegistration />} />
                                    </Routes>
                                </Content>
                                <AppFooter />
                            </Layout>
                        </Layout>
                    }
                />

                <Route path="/admin/*" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                </Route>
            </Routes>
        </Router>
    );
}
export default App