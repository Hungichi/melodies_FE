import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { MusicNoteOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <Title level={1} className="text-4xl font-bold text-blue-600">
          Welcome to Melodies
        </Title>
        <Paragraph className="text-lg text-gray-600">
          Your personal music collection and streaming platform
        </Paragraph>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            className="h-full"
            cover={
              <div className="p-6 bg-blue-50 flex justify-center items-center">
                <MusicNoteOutlined className="text-4xl text-blue-500" />
              </div>
            }
          >
            <Card.Meta
              title="Your Music Library"
              description="Access your personal collection of songs and playlists"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            className="h-full"
            cover={
              <div className="p-6 bg-green-50 flex justify-center items-center">
                <MusicNoteOutlined className="text-4xl text-green-500" />
              </div>
            }
          >
            <Card.Meta
              title="Stream Anywhere"
              description="Listen to your music on any device, anywhere"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            className="h-full"
            cover={
              <div className="p-6 bg-purple-50 flex justify-center items-center">
                <MusicNoteOutlined className="text-4xl text-purple-500" />
              </div>
            }
          >
            <Card.Meta
              title="Create Playlists"
              description="Organize your music into custom playlists"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home; 