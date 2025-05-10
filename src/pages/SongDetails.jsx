import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSongDetail } from '../store/action/userAction';
import { Button, Typography, Space, Tag, Badge, Spin } from 'antd';
import {
    PlayCircleOutlined,
    HeartOutlined,
    MessageOutlined,
    EyeOutlined,
    PauseCircleOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const SongDetails = () => {
    const { id } = useParams();
    const [songDetail, setSongDetail] = useState(null);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isAudioReady, setIsAudioReady] = useState(false);

    const handleAudioCanPlayThrough = () => {
        setIsAudioReady(true);
    };

    const handlePlayClick = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getSongDetail(id);
                setSongDetail(res.data.data);
            } catch (error) {
                console.error('Failed to fetch song details:', error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    if (!songDetail) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
                <Spin size="large" fullscreen tip="Loading..." />
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-b from-[#412C3A] to-[#1F1A23] min-h-screen p-10 text-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="w-full">
                    <img
                        src={songDetail.coverImage}
                        alt="Cover"
                        className="rounded-2xl w-full shadow-lg object-cover max-h-[500px]"
                    />
                </div>

                <div>
                    <Title
                        level={1}
                        className="!text-white text-4xl md:text-5xl font-bold"
                    >
                        {songDetail.title}
                    </Title>
                    <Text className="text-gray-300 text-lg">
                        By {songDetail.artist.username}
                    </Text>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <Badge
                            color="pink"
                            style={{ color: 'white' }}
                            text={songDetail.genre}
                        />
                        <Text className="text-gray-400">
                            {new Date(
                                songDetail.releaseDate
                            ).toLocaleDateString()}
                        </Text>
                        <Text className="text-gray-400">
                            · {songDetail.duration}s
                        </Text>
                    </div>

                    <div className="mt-6 space-y-2 text-gray-300">
                        <div className="flex items-center gap-2">
                            <EyeOutlined /> {songDetail.plays} Plays
                        </div>
                        <div className="flex items-center gap-2">
                            <HeartOutlined /> {songDetail.likes.length} Likes
                        </div>
                        <div className="flex items-center gap-2">
                            <MessageOutlined /> {songDetail.comments.length}{' '}
                            Comments
                        </div>
                    </div>

                    <div className="mt-6">
                        <audio
                            ref={audioRef}
                            controls
                            className="w-full rounded-lg"
                            disabled={!isAudioReady}
                            onCanPlayThrough={handleAudioCanPlayThrough}
                        >
                            <source
                                src={songDetail.audioUrl}
                                type="audio/mp3"
                            />
                            Your browser does not support the audio element.
                        </audio>
                    </div>

                    <Space size="middle" className="mt-6">
                        <button
                            onClick={() => handlePlayClick()}
                            className="w-28 border-none rounded-full py-2 px-2 bg-[#9B4C8B] text-white active:bg-[#BB6AA6] active:text-white transition-colors"
                        >
                            {isPlaying ? (
                                <PauseCircleOutlined className="mr-2" />
                            ) : (
                                <PlayCircleOutlined className="mr-2" />
                            )}
                            {isPlaying ? 'Pause' : 'Play'}
                        </button>
                        <button className="bg-white text-black border-gray-400 rounded-full py-2 px-6 hover:bg-[#9B4C8B] hover:text-white active:bg-[#BB6AA6] active:text-white transition-colors">
                            <HeartOutlined className="mr-2" />
                            Like
                        </button>
                        <button className="bg-white text-black border-gray-400 rounded-full py-2 px-6 hover:bg-[#9B4C8B] hover:text-white active:bg-[#BB6AA6] active:text-white transition-colors">
                            <MessageOutlined className="mr-2" />
                            Comment
                        </button>
                    </Space>

                    <div className="mt-6 text-gray-400 space-y-2">
                        <div>
                            <strong>Release Date:</strong>{' '}
                            {new Date(
                                songDetail.releaseDate
                            ).toLocaleDateString()}
                        </div>
                        <div>
                            <strong>Last Updated:</strong>{' '}
                            {new Date(
                                songDetail.updatedAt
                            ).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SongDetails;
