import { Card, Row, Col, Typography, Button } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Home = () => {
    const featuredSongs = [
        {
            id: 1,
            title: 'Song 1',
            artist: 'Artist 1',
            cover: 'https://via.placeholder.com/200',
        },
        {
            id: 2,
            title: 'Song 2',
            artist: 'Artist 2',
            cover: 'https://via.placeholder.com/200',
        },
        {
            id: 3,
            title: 'Song 3',
            artist: 'Artist 3',
            cover: 'https://via.placeholder.com/200',
        },
        {
            id: 4,
            title: 'Song 4',
            artist: 'Artist 4',
            cover: 'https://via.placeholder.com/200',
        },
    ];

    return (
        <div>
            {/* Hero Section */}
            <div
                style={{
                    background: 'linear-gradient(45deg, #1890ff, #722ed1)',
                    padding: '60px 24px',
                    borderRadius: '8px',
                    marginBottom: '40px',
                    color: 'white',
                    textAlign: 'center',
                }}
            >
                <Title level={1} style={{ color: 'white' }}>
                    Welcome to Melodies
                </Title>
                <Paragraph style={{ color: 'white', fontSize: '18px' }}>
                    Discover and enjoy your favorite music
                </Paragraph>
                <Button
                    type="primary"
                    size="large"
                    icon={<PlayCircleOutlined />}
                >
                    Start Listening
                </Button>
            </div>

            {/* Featured Songs */}
            <Title level={2}>Featured Songs</Title>
            <Row gutter={[24, 24]}>
                {featuredSongs.map((song) => (
                    <Col xs={24} sm={12} md={6} key={song.id}>
                        <Card
                            hoverable
                            cover={<img alt={song.title} src={song.cover} />}
                            actions={[
                                <Button
                                    type="primary"
                                    icon={<PlayCircleOutlined />}
                                >
                                    Play
                                </Button>,
                            ]}
                        >
                            <Card.Meta
                                title={song.title}
                                description={song.artist}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Popular Artists */}
            <Title level={2} style={{ marginTop: '40px' }}>
                Popular Artists
            </Title>
            <Row gutter={[24, 24]}>
                {[1, 2, 3, 4].map((artist) => (
                    <Col xs={24} sm={12} md={6} key={artist}>
                        <Card
                            hoverable
                            cover={
                                <img
                                    alt={`Artist ${artist}`}
                                    src="https://via.placeholder.com/200"
                                />
                            }
                        >
                            <Card.Meta
                                title={`Artist ${artist}`}
                                description="Popular Artist"
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Home;
