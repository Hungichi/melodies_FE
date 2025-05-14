import React, { useState, useEffect, useRef } from 'react';
import {
    Card,
    Row,
    Col,
    Typography,
    Layout,
    Carousel,
    Spin,
    Button,
    message,
    Collapse,
    Table,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { getAllSongArtist } from '../store/action/artistAction';
import { getSongGenres, getTrendingSongs } from '../store/action/userAction';
import { PlayCircleOutlined } from '@ant-design/icons';
const { Panel } = Collapse;

const { Content } = Layout;
const { Title, Text } = Typography;
const imageStyle = {
    borderRadius: 4,
    height: 200,
    objectFit: 'cover',
};


const textEllipsis = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
};
const Home = () => {
    const navigate = useNavigate();
    const songsRef = useRef(null); // Reference to scroll into view

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 6,
        total: 0,
    });
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [genres, setGenres] = useState([]);
    const [genresLoading, setGenresLoading] = useState(true);


    const handleExploreClick = () => {
        songsRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleShowDetail = (id) => {
        navigate(`/song-detail/${id}`);
    };




    useEffect(() => {
        const { current, pageSize } = pagination;
        setLoading(true);

        getAllSongArtist(current, pageSize)
            .then((data) => {
                setSongs((prevSongs) =>
                    current === 1 ? data.data : [...prevSongs, ...data.data]
                );
                setPagination((prev) => ({
                    ...prev,
                    total: data.pagination.total,
                }));
            })
            .catch((err) => {
                console.error('Error fetching songs:', err);
                message.error('Failed to load songs. Please try again later.');
            })
            .finally(() => setLoading(false));
    }, [pagination.current, pagination.pageSize]);

    // Fetch genres
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await getSongGenres();
                setGenres(response?.data);
                setGenresLoading(false);
            } catch (error) {
                console.error('Error fetching song genres:', error);
                message.error('Failed to load genres. Please try again later.');
                setGenresLoading(false);
            }
        };

        fetchGenres();
    }, []);



    return (
        <Layout style={{ minHeight: '100vh', background: '#1a1221' }}>
            <Layout style={{ background: '#231829' }}>
                <Content style={{ padding: 24 }}>
                    <div className="relative h-[70vh] w-full rounded-2xl overflow-hidden shadow-xl">
                        <img
                            src="/carousel.jpg"
                            alt="Hero"
                            className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-8">
                            <div className="text-white text-center max-w-2xl">
                                <h2 className="text-4xl sm:text-5xl font-bold mb-4">Stream Music That Moves You</h2>
                                <p className="text-pink-200 text-xl">Discover new artists, albums, and live experiences</p>
                                <button
                                    onClick={handleExploreClick}
                                    className="mt-6 px-6 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition duration-300"
                                >
                                    Explore Now
                                </button>
                            </div>
                        </div>
                    </div>

                    <Title ref={songsRef} level={2} style={{ color: 'white', marginTop: 24 }}>
                        Songs
                    </Title>

                    {loading ? (
                        <Spin size="large" style={{ display: 'block', margin: 'auto' }} />
                    ) : (
                        <Row gutter={[16, 16]}>
                            {songs.map((song) => (
                                <Col xs={24} sm={12} md={8} key={song._id}>
                                    <Card
                                        hoverable
                                        cover={
                                            song.coverImage ? (
                                                <img
                                                    alt="cover"
                                                    src={song.coverImage}
                                                    style={imageStyle}
                                                />
                                            ) : (
                                                <div
                                                    style={{
                                                        height: 200,
                                                        backgroundColor: '#f0f0f0',
                                                        borderRadius: 8,
                                                        textAlign: 'center',
                                                        lineHeight: '200px',
                                                    }}
                                                >
                                                    No Cover Image
                                                </div>
                                            )
                                        }
                                        style={{
                                            borderRadius: 4,
                                            padding: 8,
                                            backgroundColor: 'transparent',
                                            color: '#b3b3b3',
                                        }}
                                        styles={{ body: { padding: 3 } }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#523749';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }}
                                        variant="borderless"
                                    >
                                        <div
                                            style={{
                                                ...textEllipsis,
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: 18,
                                                marginBottom: 4,
                                                cursor: 'pointer',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.textDecoration = 'underline';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.textDecoration = 'none';
                                            }}
                                            onClick={() => handleShowDetail(song._id)}
                                        >
                                            {song.title}
                                        </div>

                                        <div
                                            style={{
                                                ...textEllipsis,
                                                color: '#B3B3B3',
                                                fontSize: 14,
                                                marginBottom: 8,
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.textDecoration = 'underline';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.textDecoration = 'none';
                                            }}
                                        >
                                            {song.artist.username}
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )}
                    {pagination.current * pagination.pageSize < pagination.total && (
                        <div className="text-center mt-4">
                            <Button
                                onClick={() =>
                                    setPagination((prev) => ({
                                        ...prev,
                                        current: prev.current + 1,
                                    }))
                                }
                                type="primary"
                                className="bg-[#523749] hover:bg-[#6a4b60] border-none font-semibold rounded-md px-6 py-2 transition-all duration-200 shadow-md"
                            >
                                View More
                            </Button>
                        </div>
                    )}
                    <div style={{ margin: '200px' }}>

                    </div>
                </Content>
            </Layout>

        </Layout>
    );
};

export default Home;
