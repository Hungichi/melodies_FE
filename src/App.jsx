import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AppFooter from './components/Footer';
import DiscoverPage from './pages/Discover';
import Album from './pages/Album';
import ArtistProfileForm from './pages/Artist';
import MusicUploadPage from './pages/Upload';
import { AudioPlayerProvider } from './contexts/AudioPlayerContext';
import MusicPlayerBar from './components/MusicPlayerBar';
import Playlists from './pages/Playlist';
import PlaylistsWithProvider from './pages/Playlist';

const { Content } = Layout;

function App() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <AudioPlayerProvider>
            <Router>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
                    <Layout
                        style={{
                            marginLeft: collapsed ? 80 : 200,
                            transition: 'margin-left 0.2s',
                            position: 'relative',
                            paddingBottom: '80px'
                        }}
                    >
                        <Navbar />
                        <Content style={{ padding: '24px', background: '#412C3A' }}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/discover" element={<DiscoverPage />} />
                                <Route path="/album" element={<Album />} />
                                <Route path="/artist" element={<ArtistProfileForm/>} />
                                <Route path="/upload" element={<MusicUploadPage/>}/>
                                <Route path="/playlist" element={<PlaylistsWithProvider/>}/>
                            </Routes>
                        </Content>
                        <AppFooter />
                    </Layout>
                    <div style={{ 
                        position: 'fixed', 
                        bottom: 0, 
                        left: collapsed ? 80 : 200, 
                        right: 0, 
                        zIndex: 1000,
                        transition: 'left 0.2s'
                    }}>
                        <MusicPlayerBar />
                    </div>
                </Layout>
            </Router>
        </AudioPlayerProvider>
    );
}
export default App;
