import { Card, Row, Col, Typography, Button, Layout, Menu, List, Avatar, Space, Divider, Input } from 'antd';
import { PlayCircleOutlined, HeartOutlined, UserOutlined, HomeOutlined, SearchOutlined, PlaySquareOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header, Sider, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const Home = () => {
  // Sample data for different sections
  const weeklyTopSongs = [
    { id: 1, title: 'Song 1', artist: 'Artist 1', cover: 'https://via.placeholder.com/200' },
    { id: 2, title: 'Song 2', artist: 'Artist 2', cover: 'https://via.placeholder.com/200' },
    { id: 3, title: 'Song 3', artist: 'Artist 3', cover: 'https://via.placeholder.com/200' },
    { id: 4, title: 'Song 4', artist: 'Artist 4', cover: 'https://via.placeholder.com/200' },
  ];

  const newReleases = [
    { id: 1, title: 'New Song 1', artist: 'Artist 1', cover: 'https://via.placeholder.com/200' },
    { id: 2, title: 'New Song 2', artist: 'Artist 2', cover: 'https://via.placeholder.com/200' },
    { id: 3, title: 'New Song 3', artist: 'Artist 3', cover: 'https://via.placeholder.com/200' },
    { id: 4, title: 'New Song 4', artist: 'Artist 4', cover: 'https://via.placeholder.com/200' },
  ];

  const trendingSongs = [
    { rank: 1, title: 'Sicko Mode', artist: 'Travis Scott', date: 'Nov 28, 2023', duration: '2:42' },
    { rank: 2, title: 'Skyfall Beats', artist: 'Imagine Dragons', date: 'Oct 15, 2023', duration: '3:15' },
    { rank: 3, title: 'Greedy', artist: 'Tate McRae', date: 'Dec 01, 2023', duration: '2:11' },
    { rank: 4, title: 'Lovin On Me', artist: 'Jack Harlow', date: 'Dec 05, 2023', duration: '2:18' },
    { rank: 5, title: 'Paint The Town Red', artist: 'Doja Cat', date: 'Dec 10, 2023', duration: '3:51' },
    { rank: 6, title: 'Dance On Night', artist: 'Dua Lipa', date: 'May 27, 2023', duration: '2:56' },
    { rank: 7, title: 'Water', artist: 'Tyla', date: 'Dec 15, 2023', duration: '3:20' },
  ];

  const popularArtists = [
    { name: 'Eminem', avatar: 'https://via.placeholder.com/100' },
    { name: 'Imagine Dragons', avatar: 'https://via.placeholder.com/100' },
    { name: 'Adele', avatar: 'https://via.placeholder.com/100' },
    { name: 'Lana Del Rey', avatar: 'https://via.placeholder.com/100' },
    { name: 'Harry Styles', avatar: 'https://via.placeholder.com/100' },
    { name: 'Billie Eilish', avatar: 'https://via.placeholder.com/100' },
  ];

  const musicVideos = [
    { title: 'Gossip', artist: 'Måneskin', cover: 'https://via.placeholder.com/200' },
    { title: 'Shape of You', artist: 'Ed Sheeran', cover: 'https://via.placeholder.com/200' },
    { title: 'Someone Like You', artist: 'Adele', cover: 'https://via.placeholder.com/200' },
  ];

  const topAlbums = [
    { title: 'Meteora', artist: 'Linkin Park', cover: 'https://via.placeholder.com/200' },
    { title: 'Midnight Marauders', artist: 'A Tribe Called Quest', cover: 'https://via.placeholder.com/200' },
    { title: 'Evermore', artist: 'Taylor Swift', cover: 'https://via.placeholder.com/200' },
    { title: 'Born To Die', artist: 'Lana Del Rey', cover: 'https://via.placeholder.com/200' },
  ];

  const moodPlaylists = [
    { title: 'Sad Songs', cover: 'https://via.placeholder.com/200' },
    { title: 'Chill Songs', cover: 'https://via.placeholder.com/200' },
    { title: 'Workout Songs', cover: 'https://via.placeholder.com/200' },
    { title: 'Love Playlists', cover: 'https://via.placeholder.com/200' },
    { title: 'Happy Tunes', cover: 'https://via.placeholder.com/200' },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#1a1221' }}>
      

      <Layout style={{ background: '#1a1221' }}>
        {/* Header */}

        {/* Main Content */}
        <Content style={{ padding: '24px', background: '#1a1221' }}>
          {/* Hero Section */}
          <Card
            cover={<img alt="Billie Eilish" src="https://via.placeholder.com/1200x300" />}
            style={{ borderRadius: '8px', marginBottom: '40px', background: '#3d2a3a', border: 'none' }}
            bodyStyle={{ textAlign: 'center', padding: '20px' }}
          >
            <Title level={2} style={{ color: 'white', marginBottom: '10px' }}>
              Billie Eilish
            </Title>
            <Paragraph style={{ color: 'white', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
              Billie Eilish is known for her unique sound and style, blending pop with dark, introspective themes.
            </Paragraph>
            <Button
              type="primary"
              size="large"
              icon={<PlayCircleOutlined />}
              style={{ marginTop: '20px', background: '#ff1f9c', border: 'none', borderRadius: '20px' }}
            >
              Play Now
            </Button>
          </Card>

          {/* Weekly Top Songs */}
          <Title level={3} style={{ color: 'white', marginBottom: '20px' }}>
            Weekly Top Songs
          </Title>
          <Row gutter={[16, 16]}>
            {weeklyTopSongs.map((song) => (
              <Col xs={24} sm={12} md={6} key={song.id}>
                <Card
                  hoverable
                  cover={<img alt={song.title} src={song.cover} />}
                  style={{ background: '#3d2a3a', border: 'none' }}
                  bodyStyle={{ padding: '10px' }}
                  actions={[
                    <Button
                      type="primary"
                      icon={<PlayCircleOutlined />}
                      style={{ background: '#ff1f9c', border: 'none', borderRadius: '20px' }}
                    >
                      Play
                    </Button>,
                  ]}
                >
                  <Card.Meta
                    title={<span style={{ color: 'white' }}>{song.title}</span>}
                    description={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{song.artist}</span>}
                  />
                </Card>
              </Col>
            ))}
            <Col xs={24} style={{ textAlign: 'right' }}>
              <Button type="link" style={{ color: '#ff1f9c' }}>View All</Button>
            </Col>
          </Row>

          {/* New Release Songs */}
          <Title level={3} style={{ color: 'white', marginTop: '40px', marginBottom: '20px' }}>
            New Release Songs
          </Title>
          <Row gutter={[16, 16]}>
            {newReleases.map((song) => (
              <Col xs={24} sm={12} md={6} key={song.id}>
                <Card
                  hoverable
                  cover={<img alt={song.title} src={song.cover} />}
                  style={{ background: '#3d2a3a', border: 'none' }}
                  bodyStyle={{ padding: '10px' }}
                  actions={[
                    <Button
                      type="primary"
                      icon={<PlayCircleOutlined />}
                      style={{ background: '#ff1f9c', border: 'none', borderRadius: '20px' }}
                    >
                      Play
                    </Button>,
                  ]}
                >
                  <Card.Meta
                    title={<span style={{ color: 'white' }}>{song.title}</span>}
                    description={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{song.artist}</span>}
                  />
                </Card>
              </Col>
            ))}
            <Col xs={24} style={{ textAlign: 'right' }}>
              <Button type="link" style={{ color: '#ff1f9c' }}>View All</Button>
            </Col>
          </Row>

          {/* Trending Songs */}
          <Title level={3} style={{ color: 'white', marginTop: '40px', marginBottom: '20px' }}>
            Trending Songs
          </Title>
          <List
            itemLayout="horizontal"
            dataSource={trendingSongs}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button type="link" icon={<HeartOutlined />} style={{ color: '#ff1f9c' }} />,
                  <Text style={{ color: 'white' }}>{item.duration}</Text>,
                ]}
                style={{ background: '#3d2a3a', padding: '10px', borderRadius: '8px', marginBottom: '8px' }}
              >
                <List.Item.Meta
                  avatar={<Text style={{ color: 'white', fontSize: '18px' }}>{item.rank}</Text>}
                  title={<span style={{ color: 'white' }}>{item.title}</span>}
                  description={
                    <div>
                      <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{item.artist}</Text>
                      <br />
                      <Text style={{ color: 'rgba(255, 255, 255, 0.5)' }}>{item.date}</Text>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button type="primary" style={{ background: '#ff1f9c', border: 'none', borderRadius: '20px' }}>
              + View All
            </Button>
          </div>

          {/* Popular Artists */}
          <Title level={3} style={{ color: 'white', marginTop: '40px', marginBottom: '20px' }}>
            Popular Artists
          </Title>
          <Row gutter={[16, 16]}>
            {popularArtists.map((artist) => (
              <Col xs={24} sm={12} md={4} key={artist.name}>
                <div style={{ textAlign: 'center' }}>
                  <Avatar size={100} src={artist.avatar} />
                  <div style={{ marginTop: '10px' }}>
                    <Text style={{ color: 'white' }}>{artist.name}</Text>
                  </div>
                </div>
              </Col>
            ))}
            <Col xs={24} style={{ textAlign: 'right' }}>
              <Button type="link" style={{ color: '#ff1f9c' }}>View All</Button>
            </Col>
          </Row>

          {/* Music Videos */}
          <Title level={3} style={{ color: 'white', marginTop: '40px', marginBottom: '20px' }}>
            Music Videos
          </Title>
          <Row gutter={[16, 16]}>
            {musicVideos.map((video) => (
              <Col xs={24} sm={12} md={8} key={video.title}>
                <Card
                  hoverable
                  cover={<img alt={video.title} src={video.cover} />}
                  style={{ background: '#3d2a3a', border: 'none' }}
                  bodyStyle={{ padding: '10px' }}
                >
                  <Card.Meta
                    title={<span style={{ color: 'white' }}>{video.title}</span>}
                    description={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{video.artist}</span>}
                  />
                </Card>
              </Col>
            ))}
            <Col xs={24} style={{ textAlign: 'right' }}>
              <Button type="link" style={{ color: '#ff1f9c' }}>View All</Button>
            </Col>
          </Row>

          {/* Top Albums */}
          <Title level={3} style={{ color: 'white', marginTop: '40px', marginBottom: '20px' }}>
            Top Albums
          </Title>
          <Row gutter={[16, 16]}>
            {topAlbums.map((album) => (
              <Col xs={24} sm={12} md={6} key={album.title}>
                <Card
                  hoverable
                  cover={<img alt={album.title} src={album.cover} />}
                  style={{ background: '#3d2a3a', border: 'none' }}
                  bodyStyle={{ padding: '10px' }}
                >
                  <Card.Meta
                    title={<span style={{ color: 'white' }}>{album.title}</span>}
                    description={<span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{album.artist}</span>}
                  />
                </Card>
              </Col>
            ))}
            <Col xs={24} style={{ textAlign: 'right' }}>
              <Button type="link" style={{ color: '#ff1f9c' }}>View All</Button>
            </Col>
          </Row>

          {/* Mood Playlists */}
          <Title level={3} style={{ color: 'white', marginTop: '40px', marginBottom: '20px' }}>
            Mood Playlists
          </Title>
          <Row gutter={[16, 16]}>
            {moodPlaylists.map((playlist) => (
              <Col xs={24} sm={12} md={6} key={playlist.title}>
                <Card
                  hoverable
                  cover={<img alt={playlist.title} src={playlist.cover} />}
                  style={{ background: '#3d2a3a', border: 'none' }}
                  bodyStyle={{ padding: '10px' }}
                >
                  <Card.Meta
                    title={<span style={{ color: 'white' }}>{playlist.title}</span>}
                  />
                </Card>
              </Col>
            ))}
            <Col xs={24} style={{ textAlign: 'right' }}>
              <Button type="link" style={{ color: '#ff1f9c' }}>View All</Button>
            </Col>
          </Row>

          {/* Join Our Platform */}
          <Card style={{ marginTop: '40px', background: '#3d2a3a', border: 'none', borderRadius: '8px' }} bodyStyle={{ textAlign: 'center', padding: '40px' }}>
            <Title level={3} style={{ color: 'white' }}>
              Join Our Platform
            </Title>
            <Paragraph style={{ color: 'rgba(255, 255, 255, 0.7)', maxWidth: '600px', margin: '0 auto' }}>
              You can be one of the members of our platform by just adding some necessary information. If you already have an account on our website, you can just hit the login button.
            </Paragraph>
            <Space style={{ marginTop: '20px' }}>
              <Link to="/register">
              <Button type="primary" style={{ background: '#ff1f9c', border: 'none', borderRadius: '20px' }}>
                Sign Up
              </Button>
              </Link>
              <Link to ="/login">
              <Button type="primary" style={{ background: '#ff1f9c', border: 'none', borderRadius: '20px' }}>
                Login
              </Button>
            </Link>
            </Space>
          </Card>
        </Content>

      </Layout>
    </Layout>
  );
};

export default Home;