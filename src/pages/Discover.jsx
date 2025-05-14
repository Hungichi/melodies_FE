import {
    Layout,
    Typography,
    Card,
    Row,
    Col,
    Input,
    Button,
    Avatar,
    Space,
} from 'antd';
import { SearchOutlined, UserOutlined, RightOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Meta } = Card;

// Sample data
const genres = [
  { id: 1, title: "Rap Tracks", cover: "https://tse4.mm.bing.net/th?id=OIP.jJlrNWPTfEiEdO_ZR1sKRQHaHb&pid=Api" },
  { id: 2, title: "Pop Tracks", cover: "https://tse2.mm.bing.net/th?id=OIP.m2LD4MrEqMLtcyiYvki0PQHaEK&pid=Api" },
  { id: 3, title: "Rock Tracks", cover: "https://tse4.mm.bing.net/th?id=OIP.J15B75l1ruDJ7uThNbqQRAHaHa&pid=Api" },
  { id: 4, title: "Classic Tracks", cover: "https://tse2.mm.bing.net/th?id=OIP.uED70yKoH7czzqchUi28TgHaHa&pid=Api" },
  { id: 5, title: "Jazz Vibes", cover: "https://tse2.mm.bing.net/th?id=OIP.zieq0MGu1rOjUMY5eiBi3QHaHW&w=470&h=470&c=7" },
  { id: 6, title: "EDM Bangers", cover: "https://tse3.mm.bing.net/th?id=OIP.KsZ6_D37aZI-AIu-snkpIQHaHa&w=474&h=474&c=7" },
  { id: 7, title: "Indie Pop", cover: "https://tse2.mm.bing.net/th?id=OIP.vOfTtjqhBpUd-g-bRGdoTQAAAA&w=474&h=474&c=7" },
  { id: 8, title: "K-Pop", cover: "https://tse2.mm.bing.net/th?id=OIP.DgDPlvoPAPgU4ha8PRc5dAHaHa&w=474&h=474&c=7" },
  
];


const playlists = [
  { 
    title: 'Sad Songs', 
    cover: 'https://tse1.mm.bing.net/th?id=OIP.QE_H9FWJP-8ZsVpcJl8zWwHaHa&w=474&h=474&c=7' 
  },
  { 
    title: 'Chill Songs', 
    cover: 'https://tse1.mm.bing.net/th?id=OIP.R3YGoXiCS9EL4UJnTsP6nAHaHa&w=474&h=474&c=7' 
  },
  { 
    title: 'Workout Songs', 
    cover: 'https://tse2.mm.bing.net/th?id=OIP.fRAI7aZlOs_BY_eQYZanOAHaHa&w=474&h=474&c=7' 
  },
  { 
    title: 'Love Playlists', 
    cover: 'https://tse1.mm.bing.net/th?id=OIP.Ht8T5qersvFL_fzVhOM3yQHaHa&pid=Api' 
  },
  { 
    title: 'Happy Tunes', 
    cover: 'https://tse4.mm.bing.net/th?id=OIP.3ypnmZ-qgSCaJkWF7OGp0wHaHa&w=474&h=474&c=7' 
  },
  { 
    title: 'Rainy Day Vibes', 
    cover: 'https://tse3.mm.bing.net/th?id=OIP.FDQHV-O0NpI6ZiVsWFb7UAHaHa&w=474&h=474&c=7' 
  },
  { 
    title: 'Late Night Drives', 
    cover: 'https://tse4.mm.bing.net/th?id=OIP.eoyen5qAjXFA0aHNqqr_NAHaHa&w=474&h=474&c=7' 
  },
  { 
    title: 'Focus Beats', 
    cover: 'https://tse4.mm.bing.net/th?id=OIP.4RKrGPs7AWjNn5fMvn0vXQHaHa&w=474&h=474&c=7' 
  }
]

const artists = [
  { name: 'Sơn Tùng M-TP', avatar: 'https://tse2.mm.bing.net/th?id=OIP.324bsajLsJTW9JAQ9tXJkgHaHa&w=474&h=474&c=7' },
  { name: 'Đen Vâu', avatar: 'https://tse4.mm.bing.net/th?id=OIP.hiW7M6cj0k_BP24AYhLcJgHaHa&w=474&h=474&c=7' },
  { name: 'Hoàng Thùy Linh', avatar: 'https://tse4.mm.bing.net/th?id=OIP.IAHLVTjvlQa1TJXRThnopAHaLG&w=474&h=474&c=7' },
  { name: 'Erik', avatar: 'https://tse3.mm.bing.net/th?id=OIP.v8eVtfjjEStVWXkWXNC9YAHaJQ&w=474&h=474&c=7' },
  { name: 'AMEE', avatar: 'https://tse4.mm.bing.net/th?id=OIP.PxhFT8aFwpPKm7l0ub8A_AHaKn&w=474&h=474&c=7' },
  { name: 'Hoàng Dũng', avatar: 'https://tse4.mm.bing.net/th?id=OIP.FE9pO0f7qa92_W16gnq-2QHaLH&w=474&h=474&c=7' },
]

// Updated styles to match Login and ArtistProfileForm
const styles = {
    layout: {
        background: 'linear-gradient(135deg, #1a1221 0%, #2D1F31 100%)', // Background gradient from Login
        minHeight: '100vh',
    },
    header: {
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        height: 'auto',
    },
    searchInput: {
        width: 250,
        borderRadius: 24, // Match Login's rounded corners
        background: 'rgba(91, 73, 89, 0.7)', // Input background from Login
        border: '1px solid rgba(255, 31, 156, 0.3)', // Border from Login
        color: '#FFFFFF',
    },
    content: {
        padding: '0 50px',
        marginTop: 20,
    },
    sectionTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        color: '#FFFFFF', // White text from Login
        margin: 0,
        textShadow: '0 0 10px rgba(255, 31, 156, 0.5)', // Glow effect from Login
    },
    highlight: {
        color: '#ff1f9c', // Primary pink from Login
    },
    viewAllBtn: {
        color: 'rgba(255, 255, 255, 0.9)', // Muted white from Login
        display: 'flex',
        alignItems: 'center',
        fontWeight: 500,
    },
    genreCard: {
        width: '100%',
        height: 180,
        borderRadius: 24, // Match Login's rounded corners
        overflow: 'hidden',
        position: 'relative',
        border: 'none',
        background: 'linear-gradient(135deg, #3d2a3a 0%, #4d3649 100%)', // Card gradient from Login
        boxShadow:
            '0 10px 30px rgba(0,0,0,0.4), 0 0 20px rgba(255, 31, 156, 0.15)', // Shadow from Login
    },
    cardCover: {
        height: '100%',
        width: '100%',
        objectFit: 'cover',
    },
    cardOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background:
            'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
        padding: '30px 16px 16px',
        color: '#FFFFFF',
    },
    playlistMeta: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    count: {
        color: '#ff4db2', // Secondary pink from Login
        fontSize: 12,
    },
    artistCard: {
        textAlign: 'center',
        background: 'transparent',
        border: 'none',
    },
    artistAvatar: {
        width: '100%',
        height: 'auto',
        marginBottom: 8,
        borderRadius: '50%', // Circular avatar like Login
        border: '2px solid rgba(255, 31, 156, 0.3)', // Border from Login
    },
    artistName: {
        color: '#FFFFFF', // White text from Login
        fontSize: 14,
    },
    footer: {
        background: 'rgba(0, 0, 0, 0.3)',
        color: '#FFFFFF',
        textAlign: 'center',
        padding: '24px 50px',
        marginTop: 60,
    },
};

const DiscoverPage = () => {
    return (
        <Layout style={styles.layout}>
            <Content style={styles.content}>
                {/* Music Genres Section */}
                <div style={{ marginBottom: 40 }}>
                    <div style={styles.sectionTitle}>
                        <Title level={3} style={styles.title}>
                            Music <span style={styles.highlight}>Genres</span>
                        </Title>
                        <Button type="text" style={styles.viewAllBtn}>
                            View All <RightOutlined />
                        </Button>
                    </div>

                    <Row gutter={[16, 16]}>
                        {genres.map((genre) => (
                            <Col xs={12} sm={12} md={6} key={genre.id}>
                                <Card
                                    style={styles.genreCard}
                                    cover={
                                        <img
                                            alt={genre.title}
                                            src={
                                                genre.cover ||
                                                '/placeholder.svg'
                                            }
                                            style={styles.cardCover}
                                        />
                                    }
                                    bodyStyle={{ padding: 0 }}
                                    hoverable
                                >
                                    <div style={styles.cardOverlay}>
                                        <Text
                                            strong
                                            style={{ color: '#FFFFFF' }}
                                        >
                                            {genre.title}
                                        </Text>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>

                {/* Mood Playlists Section */}
                <div style={{ marginBottom: 40 }}>
                    <div style={styles.sectionTitle}>
                        <Title level={3} style={styles.title}>
                            Mood <span style={styles.highlight}>Playlists</span>
                        </Title>
                        <Button type="text" style={styles.viewAllBtn}>
                            View All <RightOutlined />
                        </Button>
                    </div>

                    <Row gutter={[16, 16]}>
                        {playlists.map((playlist) => (
                            <Col
                                xs={12}
                                sm={12}
                                md={6}
                                lg={4.8}
                                key={playlist.id}
                            >
                                <Card
                                    style={styles.genreCard}
                                    cover={
                                        <img
                                            alt={playlist.title}
                                            src={
                                                playlist.cover ||
                                                '/placeholder.svg'
                                            }
                                            style={styles.cardCover}
                                        />
                                    }
                                    bodyStyle={{ padding: 0 }}
                                    hoverable
                                >
                                    <div style={styles.cardOverlay}>
                                        <Text
                                            strong
                                            style={{
                                                color: '#FFFFFF',
                                                display: 'block',
                                            }}
                                        >
                                            {playlist.title}
                                        </Text>
                                        <div style={styles.playlistMeta}>
                                            <Text
                                                style={{
                                                    color: 'rgba(255, 255, 255, 0.7)',
                                                    fontSize: 12,
                                                }}
                                            >
                                                {playlist.subtitle}
                                            </Text>
                                            <Text style={styles.count}>
                                                {playlist.count}
                                            </Text>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>

                {/* Popular Artists Section */}
                <div style={{ marginBottom: 40 }}>
                    <div style={styles.sectionTitle}>
                        <Title level={3} style={styles.title}>
                            Popular{' '}
                            <span style={styles.highlight}>Artists</span>
                        </Title>
                        <Button type="text" style={styles.viewAllBtn}>
                            View All <RightOutlined />
                        </Button>
                    </div>

                    <Row gutter={[24, 24]}>
                        {artists.map((artist) => (
                            <Col xs={8} sm={6} md={4} key={artist.id}>
                                <Card
                                    style={styles.artistCard}
                                    bodyStyle={{ padding: '8px 0' }}
                                >
                                    <Avatar
                                        src={artist.avatar}
                                        size={100}
                                        style={styles.artistAvatar}
                                        icon={<UserOutlined />}
                                    />
                                    <Meta
                                        title={
                                            <Text style={styles.artistName}>
                                                {artist.name}
                                            </Text>
                                        }
                                        style={{ marginTop: 8 }}
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Content>
        </Layout>
    );
};

export default DiscoverPage;
