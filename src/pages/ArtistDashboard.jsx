import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    List,
    Typography,
    Row,
    Col,
    Modal,
    Form,
    Input,
    Select,
    Upload,
    message,
    Spin,
    Pagination,
} from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { createSongArtist, getAllSongArtist } from '../store/action/artistAction';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;

const genreOptions = [
    'Pop', 'Rock', 'Hip-Hop', 'R&B', 'Electronic', 'Classical', 'Jazz',
    'Country', 'Folk', 'Blues', 'Metal', 'Indie', 'K-Pop', 'V-Pop', 'World Music',
];

const ArtistDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 12,
        total: 0,
    });

    const handleCreateSong = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const handleFinish = async (values) => {
        console.log('Values on submit:', values);

        if (!values.audioFile?.length || !values.coverImage?.length) {
            message.error('Please upload both MP3 and Image files.');
            return;
        }

        const mp3File = values.audioFile[0].originFileObj;
        const imageFile = values.coverImage[0].originFileObj;
        const rawPayload = new FormData();
        rawPayload.append('title', values.title);
        rawPayload.append('genre', values.genre);
        rawPayload.append('description', values.description);
        rawPayload.append('duration', values.duration);
        rawPayload.append('audioFile', mp3File);
        rawPayload.append('coverImage', imageFile);

        try {
            await createSongArtist(rawPayload);
            message.success('Song created!');
            handleCancel();
        } catch (error) {
            message.error('Failed to create song. Please try again.');
            console.error(error);
        }
    };

    useEffect(() => {
        const { current, pageSize } = pagination;
        setLoading(true);
        getAllSongArtist(current, pageSize)
            .then((data) => {
                setSongs(data.data);
                setPagination((prevState) => ({
                    ...prevState,
                    total: data.pagination.total,
                }));
            })
            .catch((err) => {
                console.error('Error fetching songs:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [pagination.current, pagination.pageSize]);

    const handleShowDetail = (id) => {
        navigate(`/song-detail/${id}`)
    }

    const handlePageChange = (page, pageSize) => {
        setPagination((prevState) => ({
            ...prevState,
            current: page,
            pageSize,
        }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
                <Spin size="large" tip="Loading..." />
            </div>
        );
    }

    return (

        <div style={{ padding: 24 }}>

            <div>
                <Row justify="space-between" align="middle" style={{ marginBottom: 24, maxWidth: '1210px' }}>
                    <Col>
                        <Title level={2} style={{ margin: 0, color: 'white' }}>My Songs</Title>
                    </Col>
                    <Col>
                        <Button
                            style={{
                                backgroundColor: '#e835c2',
                                border: '1px solid rgba(255, 255, 255, 0.4)',
                                boxShadow: '0 0 8px rgba(255, 105, 180, 0.6)',
                            }}
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleCreateSong}
                        >
                            Create Song
                        </Button>
                    </Col>
                </Row>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh'
            }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 4,
                            xxl: 3,
                        }}

                        dataSource={songs}
                        renderItem={(song) => (
                            <List.Item key={song._id}>
                                <Card
                                    cover={
                                        song.coverImage ? (
                                            <img
                                                alt="cover"
                                                src={song.coverImage}
                                                style={{ borderRadius: '4px', height: '200px', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <div style={{ height: '200px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
                                                <p style={{ textAlign: 'center', lineHeight: '200px' }}>No Cover Image</p>
                                            </div>
                                        )
                                    }
                                    style={{
                                        borderRadius: 4,
                                        padding: 8,
                                        backgroundColor: 'transparent',
                                        color: '#b3b3b3',
                                    }}
                                    styles={{
                                        body: {
                                            padding: 3
                                        }
                                    }}
                                    hoverable
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#523749';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }}
                                    variant='borderless'
                                >
                                    <div
                                        style={{
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontSize: '18px',
                                            marginBottom: '4px',
                                            padding: 0,
                                            margin: 0,
                                            transition: 'text-decoration 0.3s',
                                            maxWidth: '200px',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
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
                                            color: '#B3B3B3',
                                            fontSize: '14px',
                                            marginBottom: '8px',
                                            transition: 'text-decoration 0.3s',
                                            maxWidth: '200px',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
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
                            </List.Item>
                        )}
                    />
                </div>
                <Pagination
                    current={pagination.current}
                    total={pagination.total}
                    pageSize={12}
                    onChange={handlePageChange}
                    style={{ marginTop: 24, textAlign: 'center' }}
                    itemRender={(page, type, originalElement) => {
                        if (type === 'page') {
                            return (
                                <div
                                    style={{
                                        backgroundColor: '#e835c2',
                                        border: '1px solid rgba(255, 255, 255, 0.4)',
                                        boxShadow: '0 0 8px rgba(255, 105, 180, 0.6)',
                                        color: 'white'
                                    }}
                                >
                                    {page}
                                </div>
                            );
                        }
                        return originalElement;
                    }}
                />
                <Modal
                    title={<span style={{ color: 'white' }}>Create New Song</span>}
                    open={isModalOpen}
                    onCancel={handleCancel}
                    footer={null}
                    destroyOnHidden
                    styles={{
                        header: { backgroundColor: '#412C3A' },
                        content: { backgroundColor: '#412C3A' },
                    }}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleFinish}
                        style={{ color: 'white' }}
                    >
                        <Form.Item
                            label={<span style={{ color: 'white' }}>Title</span>}
                            name="title"
                            rules={[{ required: true, message: 'Please enter a title' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ color: 'white' }}>Genre</span>}
                            name="genre"
                            rules={[{ required: true, message: 'Please select a genre' }]}
                        >
                            <Select placeholder="Select genre">
                                {genreOptions.map((genre) => (
                                    <Option key={genre} value={genre}>
                                        {genre}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ color: 'white' }}>Description</span>}
                            name="description"
                            rules={[{ required: true, message: 'Please enter a description' }]}
                        >
                            <Input.TextArea rows={3} />
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ color: 'white' }}>Duration (in seconds)</span>}
                            name="duration"
                            rules={[{ required: true, message: 'Please enter duration' }, { pattern: /^\d+$/, message: 'Duration must be a number' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ color: 'white' }}>MP3 File</span>}
                            name="audioFile"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => {
                                if (Array.isArray(e)) return e;
                                return e && e.fileList ? e.fileList : [];
                            }}
                            rules={[{ required: true, message: 'Please upload an MP3 file' }]}
                        >
                            <Upload beforeUpload={() => false} accept=".mp3">
                                <Button icon={<UploadOutlined />}>Upload MP3</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ color: 'white' }}>Cover Image (JPG)</span>}
                            name="coverImage"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => {
                                if (Array.isArray(e)) return e;
                                return e && e.fileList ? e.fileList : [];
                            }}
                            rules={[{ required: true, message: 'Please upload a JPG image' }]}
                        >
                            <Upload beforeUpload={() => false} accept=".jpg,.jpeg">
                                <Button icon={<UploadOutlined />}>Upload JPG</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                style={{
                                    backgroundColor: '#F9D0B6',
                                    color: 'black',
                                    transition: 'background-color 0.3s, transform 0.3s',
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#F2B48C';
                                    e.target.style.transform = 'scale(1.02)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = '#F9D0B6';
                                    e.target.style.transform = 'scale(1)';
                                }}
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default ArtistDashboard;
