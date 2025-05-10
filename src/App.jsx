import { useState } from 'react';
import AdminLayout from './components/AdminLayout';
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
import ArtistRequest from './components/ArtistRequest';
import ArtistDashboard from './pages/ArtistDashboard';
import SongDetails from './pages/SongDetails';

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
                            <Sidebar
                                collapsed={collapsed}
                                setCollapsed={setCollapsed}
                            />
                            <Layout
                                style={{
                                    marginLeft: collapsed ? 80 : 200,
                                    transition: 'margin-left 0.2s',
                                }}
                            >
                                <Navbar />
                                <Content style={{ background: '#412C3A' }}>
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route
                                            path="/login"
                                            element={<Login />}
                                        />
                                        <Route
                                            path="/register"
                                            element={<Register />}
                                        />
                                        <Route
                                            path="/profile"
                                            element={<Profile />}
                                        />
                                        <Route
                                            path="/discover"
                                            element={<DiscoverPage />}
                                        />
                                        <Route
                                            path="/album"
                                            element={<Album />}
                                        />
                                        <Route
                                            path="/artist"
                                            element={<ArtistProfileForm />}
                                        />
                                        <Route
                                            path="/artist-registration"
                                            element={<ArtistRegistration />}
                                        />
                                        <Route
                                            path="/artist-dashboard"
                                            element={<ArtistDashboard />}
                                        />
                                        <Route
                                            path="/song-detail/:id"
                                            element={<SongDetails />}
                                        />
                                    </Routes>
                                </Content>
                                <AppFooter />
                            </Layout>
                        </Layout>
                    }
                />

                <Route path="/admin/*" element={<AdminLayout />}>
                    <Route path="artist-request" element={<ArtistRequest />} />
                </Route>
            </Routes>
        </Router>
    );
}
export default App;
