"use client"

import { Card, Row, Col, Typography, Button, Layout, List, Avatar, Space, Slider } from "antd"
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  HeartOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  SoundOutlined,
} from "@ant-design/icons"
import { Link } from "react-router-dom"
import { AudioPlayerProvider, useAudioPlayer } from "../contexts/AudioPlayerContext"
import PlayButton from "../components/PlayButton"
import { useState, useEffect } from "react"

const { Header, Sider, Content, Footer } = Layout
const { Title, Text, Paragraph } = Typography

const Home = () => {
  // Sample data for different sections
  const weeklyTopSongs = [
    {
      id: 1,
      title: "Giờ thì",
      artist: "BuiTruongLinh",
      cover:
        "https://i.ytimg.com/vi/ItRExComFJ4/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDmBi5S0ns9U9U25Z04m3xV3mWXKg",
      filePath:
        "https://res.cloudinary.com/dhfy8t9qv/video/upload/v1744872402/y2mate.com_-_Gi%E1%BB%9D_Th%C3%AC_buitruonglinh_i54jdo.mp3",
    },
    {
      id: 2,
      title: "Phép màu",
      artist: "Đàn cá gỗ",
      cover:
        "https://i.ytimg.com/vi/OkXnZSafFns/hqdefault.jpg?sqp=-oaymwExCOADEI4CSFryq4qpAyMIARUAAIhCGAHwAQH4AbYIgAK4CIoCDAgAEAEYNyBWKHIwDw==&rs=AOn4CLCvFmvPvVXXJRKWbC8dB9tgZXOGKg",
      filePath:
        "https://res.cloudinary.com/dhfy8t9qv/video/upload/v1744872962/y2mate.com_-_Ph%C3%A9p_M%C3%A0u_%C4%90%C3%A0n_C%C3%A1_G%E1%BB%97_Original_Soundtrack_a8yqba.mp3",
    },
    {
      id: 3,
      title: "Chưa phải yêu",
      artist: "HURRYKNG",
      cover:
        "https://i.ytimg.com/vi/tvRo6gajlrk/hqdefault.jpg?sqp=-oaymwExCOADEI4CSFryq4qpAyMIARUAAIhCGAHwAQH4Af4JgALQBYoCDAgAEAEYYiBlKEgwDw==&rs=AOn4CLCEawlmmm6gi3EX0QcJZD-UZZbhxg",
      filePath:
        "https://res.cloudinary.com/dhfy8t9qv/video/upload/v1744872885/y2mate.com_-_HURRYKNG_Ch%C6%B0a_Ph%E1%BA%A3i_L%C3%A0_Y%C3%AAu_feat_REX_Lyrics_Video_r0kaar.mp3",
    },
    {
      id: 4,
      title: "Lời nói dối chân thật",
      artist: "Tlinh",
      cover:
        "https://i.ytimg.com/vi/koRbmP0BbNk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCT2wJjFI0W_RsfqWV0AsQ3FymMAg",
      filePath:
        "https://res.cloudinary.com/dhfy8t9qv/video/upload/v1744873331/utomp3.com_-_tlinh_L%E1%BB%9Di_N%C3%B3i_D%E1%BB%91i_Ch%C3%A2n_Th%E1%BA%ADt_ft_JustaTee_Live_from_GENfest_2024_o1tt8o.mp3",
    },
  ]

  const newReleases = [
    {
      id: 1,
      title: "Vùng ký ức",
      artist: "Chillies",
      cover:
        "https://i.ytimg.com/vi/T0sHaz4H9MQ/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBVvWZ0jr7P8EWi_xkDbhMqbtpb5g",
      filePath:
        "https://res.cloudinary.com/dhfy8t9qv/video/upload/v1744874251/utomp3.com_-_V%C3%B9ng_K%C3%BD_%E1%BB%A8c_Chillies_Official_Music_Video_m5feln.mp3",
    },
    {
      id: 2,
      title: "Người bình thường",
      artist: "Vũ Cát Tường",
      cover:
        "https://i.ytimg.com/vi/X5KvHXWPYm4/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAyMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAwL9MqR7lqZumeOQYbipqV2hhl2w",
      filePath:
        "https://res.cloudinary.com/dhfy8t9qv/video/upload/v1744874238/utomp3.com_-_NG%C6%AF%E1%BB%9CI_B%C3%8CNH_TH%C6%AF%E1%BB%9CNG_V%C5%A8_C%C3%81T_T%C6%AF%E1%BB%9CNG_OFFICIAL_VISUALIZER_ohlspi.mp3",
    },
    {
      id: 3,
      title: "Dancing In The Dark",
      artist: "SOOBIN",
      cover:
        "https://i.ytimg.com/vi/OZmK0YuSmXU/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCPG30-OAdTn5SuBabto2Z5kfspFw",
      filePath:
        "https://res.cloudinary.com/dhfy8t9qv/video/upload/v1744874244/utomp3.com_-_SOOBIN_Dancing_In_The_Dark_B%E1%BA%ACT_N%C3%93_L%C3%8AN_Album_Official_MV_f2c7n6.mp3",
    },
    {
      id: 4,
      title: "Bầu trời mới",
      artist: "DaLAB",
      cover:
        "https://i.ytimg.com/vi/Z1D26z9l8y8/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCvdXisBF7b9ORftL0l2m2AZhqGYg",
      filePath:
        "https://res.cloudinary.com/dhfy8t9qv/video/upload/v1744874235/utomp3.com_-_B%E1%BA%A7u_Tr%E1%BB%9Di_M%E1%BB%9Bi_Da_LAB_ft_Minh_T%E1%BB%91c_Lam_Official_MV_tiint4.mp3",
    },
  ]
  const trendingSongs = [
    { rank: 1, title: "Ôm em thật lâu", artist: "MONO", date: "3 thg 4, 2025", duration: "5:41" },
    { rank: 2, title: "Lễ đường", artist: "Kai Dinh", date: "17 thg 3, 2025", duration: "4:10" },
    { rank: 3, title: "Chạy về khóc với anh", artist: "Erik", date: "5 thg 1, 2024", duration: "4:02" },
    { rank: 4, title: "Em bé", artist: "AMEE", date: "20 thg 12, 2023", duration: "3:15" },
    { rank: 5, title: "Thích em hơi nhiều", artist: "Wren Evans", date: "10 thg 11, 2023", duration: "3:21" },
    { rank: 6, title: "Nàng thơ", artist: "Hoàng Dũng", date: "27 thg 5, 2023", duration: "4:25" },
    { rank: 7, title: "Tình yêu xanh lá", artist: "Thịnh Suy", date: "15 thg 10, 2023", duration: "3:47" },
  ]

  const popularArtists = [
    { name: "Sơn Tùng M-TP", avatar: "https://tse2.mm.bing.net/th?id=OIP.324bsajLsJTW9JAQ9tXJkgHaHa&w=474&h=474&c=7" },
    { name: "Đen Vâu", avatar: "https://tse4.mm.bing.net/th?id=OIP.hiW7M6cj0k_BP24AYhLcJgHaHa&w=474&h=474&c=7" },
    {
      name: "Hoàng Thùy Linh",
      avatar: "https://tse4.mm.bing.net/th?id=OIP.IAHLVTjvlQa1TJXRThnopAHaLG&w=474&h=474&c=7",
    },
    { name: "Erik", avatar: "https://tse3.mm.bing.net/th?id=OIP.v8eVtfjjEStVWXkWXNC9YAHaJQ&w=474&h=474&c=7" },
    { name: "AMEE", avatar: "https://tse4.mm.bing.net/th?id=OIP.PxhFT8aFwpPKm7l0ub8A_AHaKn&w=474&h=474&c=7" },
    { name: "Hoàng Dũng", avatar: "https://tse4.mm.bing.net/th?id=OIP.FE9pO0f7qa92_W16gnq-2QHaLH&w=474&h=474&c=7" },
  ]
  const musicVideos = [
    {
      title: "Gossip",
      artist: "Måneskin",
      cover:
        "https://i.ytimg.com/vi/KXvCS2KBbPw/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAj4BIBZIOu5KJKkesYYPPFUQRMzA",
    },
    {
      title: "Shape of You",
      artist: "Ed Sheeran",
      cover:
        "https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg?sqp=-oaymwEnCOADEI4CSFryq4qpAyMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCyNhDKz_FSbd7MP8gOwFKaWOeSSQ",
    },
    {
      title: "Easy On Me ",
      artist: "Adele",
      cover:
        "https://i.ytimg.com/vi/X-yIEMduRXk/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAyMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCQqarWqJLZ1nKq0oWJgbRef6R8vA",
    },
  ]

  const topAlbums = [
    {
      title: "Meteora",
      artist: "Linkin Park",
      cover: "https://tse4.mm.bing.net/th?id=OIP.CkVSativ_3X5C9zcWbSY8QHaF7&w=379&h=379&c=7",
    },
    {
      title: "Midnight Marauders",
      artist: "A Tribe Called Quest",
      cover: "https://tse2.mm.bing.net/th?id=OIP.zQcoms9WT5fTCUvUy8uOhwHaHg&w=474&h=474&c=7",
    },
    {
      title: "Evermore",
      artist: "Taylor Swift",
      cover: "https://tse2.mm.bing.net/th?id=OIP.trPAqMECa38q0l_se2FuMQHaKc&cb=iwp&w=474&h=474&c=7",
    },
    {
      title: "Born To Die",
      artist: "Lana Del Rey",
      cover: "https://tse4.mm.bing.net/th?id=OIP.yxfJP_IVmwskklTIZ4YcYQHaHa&w=474&h=474&c=7",
    },
  ]

  const moodPlaylists = [
    {
      title: "Sad Songs",
      cover: "https://tse1.mm.bing.net/th?id=OIP.QE_H9FWJP-8ZsVpcJl8zWwHaHa&w=474&h=474&c=7",
    },
    {
      title: "Chill Songs",
      cover: "https://tse1.mm.bing.net/th?id=OIP.R3YGoXiCS9EL4UJnTsP6nAHaHa&w=474&h=474&c=7",
    },
    {
      title: "Workout Songs",
      cover: "https://tse2.mm.bing.net/th?id=OIP.fRAI7aZlOs_BY_eQYZanOAHaHa&w=474&h=474&c=7",
    },
    {
      title: "Love Playlists",
      cover: "https://tse1.mm.bing.net/th?id=OIP.Ht8T5qersvFL_fzVhOM3yQHaHa&pid=Api",
    },
    {
      title: "Happy Tunes",
      cover: "https://tse4.mm.bing.net/th?id=OIP.3ypnmZ-qgSCaJkWF7OGp0wHaHa&w=474&h=474&c=7",
    },
    {
      title: "Rainy Day Vibes",
      cover: "https://tse3.mm.bing.net/th?id=OIP.FDQHV-O0NpI6ZiVsWFb7UAHaHa&w=474&h=474&c=7",
    },
    {
      title: "Late Night Drives",
      cover: "https://tse4.mm.bing.net/th?id=OIP.eoyen5qAjXFA0aHNqqr_NAHaHa&w=474&h=474&c=7",
    },
    {
      title: "Focus Beats",
      cover: "https://tse4.mm.bing.net/th?id=OIP.4RKrGPs7AWjNn5fMvn0vXQHaHa&w=474&h=474&c=7",
    },
  ]

  // Add this MusicPlayer component before the return statement in Home
  const MusicPlayer = () => {
    const { currentSong, isPlaying, playSong, pauseSong, audioRef } = useAudioPlayer()
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    useEffect(() => {
      const audio = audioRef.current

      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime)
      }

      const handleLoadedMetadata = () => {
        setDuration(audio.duration)
      }

      const handleEnded = () => {
        setCurrentTime(0)
        pauseSong()
      }

      // Add event listeners
      audio.addEventListener("timeupdate", handleTimeUpdate)
      audio.addEventListener("loadedmetadata", handleLoadedMetadata)
      audio.addEventListener("ended", handleEnded)

      // Clean up event listeners
      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate)
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
        audio.removeEventListener("ended", handleEnded)
      }
    }, [audioRef, pauseSong])

    const formatTime = (time) => {
      if (isNaN(time)) return "0:00"
      const minutes = Math.floor(time / 60)
      const seconds = Math.floor(time % 60)
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
    }

    const handleSeek = (value) => {
      if (audioRef.current) {
        audioRef.current.currentTime = value
        setCurrentTime(value)
      }
    }

    const handlePlayPause = () => {
      if (currentSong) {
        if (isPlaying) {
          pauseSong()
        } else {
          playSong(currentSong)
        }
      }
    }

    const handlePrevious = () => {
      // Since we don't have queue management in the context,
      // we'll just restart the current song
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        setCurrentTime(0)
        if (!isPlaying) {
          playSong(currentSong)
        }
      }
    }

    const handleNext = () => {
      // Since we don't have queue management in the context,
      // we'll just restart the current song for now
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        setCurrentTime(0)
        if (!isPlaying) {
          playSong(currentSong)
        }
      }
    }

    const handleVolumeChange = (value) => {
      if (audioRef.current) {
        audioRef.current.volume = value / 100
      }
    }

    if (!currentSong) return null

    return (
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#2d1e2f",
          padding: "10px 20px",
          zIndex: 1000,
          borderTop: "1px solid #3d2a3a",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", width: "25%" }}>
          <img
            src={currentSong.cover || "/placeholder.svg"}
            alt={currentSong.title}
            onError={(e) => {
              e.target.onerror = null
              e.target.src = "https://placehold.co/400x400/3d2a3a/white?text=No+Image"
            }}
            style={{ width: 50, height: 50, borderRadius: 4, marginRight: 10, objectFit: "cover" }}
          />
          <div>
            <div style={{ color: "white", fontWeight: "bold" }}>{currentSong.title}</div>
            <div style={{ color: "rgba(255, 255, 255, 0.7)" }}>{currentSong.artist}</div>
          </div>
        </div>

        <div style={{ width: "50%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
            <Button type="link" icon={<StepBackwardOutlined />} onClick={handlePrevious} style={{ color: "white" }} />
            <Button
              type="link"
              icon={
                isPlaying ? (
                  <PauseCircleOutlined style={{ fontSize: 32 }} />
                ) : (
                  <PlayCircleOutlined style={{ fontSize: 32 }} />
                )
              }
              onClick={handlePlayPause}
              style={{ color: "#ff1f9c" }}
            />
            <Button type="link" icon={<StepForwardOutlined />} onClick={handleNext} style={{ color: "white" }} />
          </div>

          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <span style={{ color: "white", marginRight: 10, fontSize: 12 }}>{formatTime(currentTime)}</span>
            <Slider
              value={currentTime}
              max={duration || 100}
              onChange={handleSeek}
              style={{ flex: 1 }}
              trackStyle={{ backgroundColor: "#ff1f9c" }}
              handleStyle={{ borderColor: "#ff1f9c", backgroundColor: "#ff1f9c" }}
            />
            <span style={{ color: "white", marginLeft: 10, fontSize: 12 }}>{formatTime(duration)}</span>
          </div>
        </div>

        <div style={{ width: "25%", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <Button type="link" icon={<SoundOutlined />} style={{ color: "white" }} />
          <Slider
            defaultValue={80}
            onChange={handleVolumeChange}
            style={{ width: 100 }}
            trackStyle={{ backgroundColor: "#ff1f9c" }}
            handleStyle={{ borderColor: "#ff1f9c", backgroundColor: "#ff1f9c" }}
          />
        </div>
      </div>
    )
  }

  // Now, let's modify the AudioPlayerContext to support our new player functionality

  // Add this at the end of the Home component, right before the export statement:
  // Make sure to add the MusicPlayer component inside the return statement, right before the closing </AudioPlayerProvider> tag

  // Modify the return statement to include the MusicPlayer component
  return (
    <AudioPlayerProvider>
      <Layout style={{ minHeight: "100vh", background: "#1a1221" }}>
        <Layout style={{ background: "#1a1221" }}>
          {/* Header */}

          {/* Main Content */}
          <Content style={{ padding: "24px", background: "#1a1221", paddingBottom: "80px" }}>
            {/* Hero Section */}
            <Card
              cover={
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "50px" }}>
                  <img
                    alt="Billie Eilish"
                    src="https://www.nme.com/wp-content/uploads/2023/12/Billie-Eilish-2.jpg"
                    style={{ width: "1200px", height: "620px", objectFit: "cover", borderRadius: "10px" }} // Adjusted height with px unit
                  />
                </div>
              }
              style={{ borderRadius: "8px", marginBottom: "40px", background: "#3d2a3a", border: "none" }}
              bodyStyle={{ textAlign: "center", padding: "20px" }}
            >
              <Title level={2} style={{ color: "white", marginBottom: "10px" }}>
                Billie Eilish
              </Title>
              <Paragraph style={{ color: "white", fontSize: "16px", maxWidth: "600px", margin: "0 auto" }}>
                Billie Eilish is known for her unique sound and style, blending pop with dark, introspective themes.
              </Paragraph>
              <Button
                type="primary"
                size="large"
                icon={<PlayCircleOutlined />}
                style={{ marginTop: "20px", background: "#ff1f9c", border: "none", borderRadius: "20px" }}
              >
                Play Now
              </Button>
            </Card>

            {/* Weekly Top Songs */}
            <Title level={3} style={{ color: "white", marginBottom: "20px" }}>
              Weekly Top Songs
            </Title>
            <Row gutter={[16, 16]}>
              {weeklyTopSongs.map((song) => (
                <Col xs={24} sm={12} md={6} key={song.id}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={song.title}
                        src={song.cover || "/placeholder.svg"}
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = "https://placehold.co/400x400/3d2a3a/white?text=No+Image"
                        }}
                        style={{ width: "100%", height: "200px", objectFit: "cover" }}
                      />
                    }
                    style={{ background: "#3d2a3a", border: "none" }}
                    bodyStyle={{ padding: "10px" }}
                    actions={[<PlayButton song={song} />]}
                  >
                    <Card.Meta
                      title={<span style={{ color: "white" }}>{song.title}</span>}
                      description={<span style={{ color: "rgba(255, 255, 255, 0.7)" }}>{song.artist}</span>}
                    />
                  </Card>
                </Col>
              ))}
              <Col xs={24} style={{ textAlign: "right" }}>
                <Button type="link" style={{ color: "#ff1f9c" }}>
                  View All
                </Button>
              </Col>
            </Row>

            {/* New Release Songs */}
            <Title level={3} style={{ color: "white", marginTop: "40px", marginBottom: "20px" }}>
              New Release Songs
            </Title>
            <Row gutter={[16, 16]}>
              {newReleases.map((song) => (
                <Col xs={24} sm={12} md={6} key={song.id}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={song.title}
                        src={song.cover || "/placeholder.svg"}
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = "https://placehold.co/400x400/3d2a3a/white?text=No+Image"
                        }}
                        style={{ width: "100%", height: "200px", objectFit: "cover" }}
                      />
                    }
                    style={{ background: "#3d2a3a", border: "none" }}
                    bodyStyle={{ padding: "10px" }}
                    actions={[<PlayButton song={song} />]}
                  >
                    <Card.Meta
                      title={<span style={{ color: "white" }}>{song.title}</span>}
                      description={<span style={{ color: "rgba(255, 255, 255, 0.7)" }}>{song.artist}</span>}
                    />
                  </Card>
                </Col>
              ))}
              <Col xs={24} style={{ textAlign: "right" }}>
                <Button type="link" style={{ color: "#ff1f9c" }}>
                  View All
                </Button>
              </Col>
            </Row>

            {/* Trending Songs */}
            <Title level={3} style={{ color: "white", marginTop: "40px", marginBottom: "20px" }}>
              Trending Songs
            </Title>
            <List
              itemLayout="horizontal"
              dataSource={trendingSongs}
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                  actions={[
                    <Button type="link" icon={<HeartOutlined />} style={{ color: "#ff1f9c" }} />,
                    <Text style={{ color: "white" }}>{item.duration}</Text>,
                  ]}
                  style={{ background: "#3d2a3a", padding: "10px", borderRadius: "8px", marginBottom: "8px" }}
                >
                  <List.Item.Meta
                    avatar={<Text style={{ color: "white", fontSize: "18px" }}>{item.rank}</Text>}
                    title={<span style={{ color: "white" }}>{item.title}</span>}
                    description={
                      <div>
                        <Text style={{ color: "rgba(255, 255, 255, 0.7)" }}>{item.artist}</Text>
                        <br />
                        <Text style={{ color: "rgba(255, 255, 255, 0.5)" }}>{item.date}</Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Button type="primary" style={{ background: "#ff1f9c", border: "none", borderRadius: "20px" }}>
                + View All
              </Button>
            </div>

            {/* Popular Artists */}
            <Title level={3} style={{ color: "white", marginTop: "40px", marginBottom: "20px" }}>
              Popular Artists
            </Title>
            <Row gutter={[16, 16]}>
              {popularArtists.map((artist, index) => (
                <Col xs={24} sm={12} md={4} key={index}>
                  <div style={{ textAlign: "center" }}>
                    <Avatar size={100} src={artist.avatar} />
                    <div style={{ marginTop: "10px" }}>
                      <Text style={{ color: "white" }}>{artist.name}</Text>
                    </div>
                  </div>
                </Col>
              ))}
              <Col xs={24} style={{ textAlign: "right" }}>
                <Button type="link" style={{ color: "#ff1f9c" }}>
                  View All
                </Button>
              </Col>
            </Row>

            {/* Music Videos */}
            <Title level={3} style={{ color: "white", marginTop: "40px", marginBottom: "20px" }}>
              Music Videos
            </Title>
            <Row gutter={[16, 16]}>
              {musicVideos.map((video) => (
                <Col xs={24} sm={12} md={8} key={video.title}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={video.title}
                        src={video.cover || "/placeholder.svg"}
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = "https://placehold.co/400x400/3d2a3a/white?text=No+Image"
                        }}
                        style={{ width: "100%", height: "200px", objectFit: "cover" }}
                      />
                    }
                    style={{ background: "#3d2a3a", border: "none" }}
                    bodyStyle={{ padding: "10px" }}
                  >
                    <Card.Meta
                      title={<span style={{ color: "white" }}>{video.title}</span>}
                      description={<span style={{ color: "rgba(255, 255, 255, 0.7)" }}>{video.artist}</span>}
                    />
                  </Card>
                </Col>
              ))}
              <Col xs={24} style={{ textAlign: "right" }}>
                <Button type="link" style={{ color: "#ff1f9c" }}>
                  View All
                </Button>
              </Col>
            </Row>

            {/* Top Albums */}
            <Title level={3} style={{ color: "white", marginTop: "40px", marginBottom: "20px" }}>
              Top Albums
            </Title>
            <Row gutter={[16, 16]}>
              {topAlbums.map((album) => (
                <Col xs={24} sm={12} md={6} key={album.title}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={album.title}
                        src={album.cover || "/placeholder.svg"}
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = "https://placehold.co/400x400/3d2a3a/white?text=No+Image"
                        }}
                        style={{ width: "100%", height: "200px", objectFit: "cover" }}
                      />
                    }
                    style={{ background: "#3d2a3a", border: "none" }}
                    bodyStyle={{ padding: "10px" }}
                  >
                    <Card.Meta
                      title={<span style={{ color: "white" }}>{album.title}</span>}
                      description={<span style={{ color: "rgba(255, 255, 255, 0.7)" }}>{album.artist}</span>}
                    />
                  </Card>
                </Col>
              ))}
              <Col xs={24} style={{ textAlign: "right" }}>
                <Button type="link" style={{ color: "#ff1f9c" }}>
                  View All
                </Button>
              </Col>
            </Row>

            {/* Mood Playlists */}
            <Title level={3} style={{ color: "white", marginTop: "40px", marginBottom: "20px" }}>
              Mood Playlists
            </Title>
            <Row gutter={[16, 16]}>
              {moodPlaylists.map((playlist) => (
                <Col xs={24} sm={12} md={6} key={playlist.title}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={playlist.title}
                        src={playlist.cover || "/placeholder.svg"}
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = "https://placehold.co/400x400/3d2a3a/white?text=No+Image"
                        }}
                        style={{ width: "100%", height: "200px", objectFit: "cover" }}
                      />
                    }
                    style={{ background: "#3d2a3a", border: "none" }}
                    bodyStyle={{ padding: "10px" }}
                  >
                    <Card.Meta title={<span style={{ color: "white" }}>{playlist.title}</span>} />
                  </Card>
                </Col>
              ))}
              <Col xs={24} style={{ textAlign: "right" }}>
                <Button type="link" style={{ color: "#ff1f9c" }}>
                  View All
                </Button>
              </Col>
            </Row>

            {/* Join Our Platform */}
            <Card
              style={{ marginTop: "40px", background: "#3d2a3a", border: "none", borderRadius: "8px" }}
              bodyStyle={{ textAlign: "center", padding: "40px" }}
            >
              <Title level={3} style={{ color: "white" }}>
                Join Our Platform
              </Title>
              <Paragraph style={{ color: "rgba(255, 255, 255, 0.7)", maxWidth: "600px", margin: "0 auto" }}>
                You can be one of the members of our platform by just adding some necessary information. If you already
                have an account on our website, you can just hit the login button.
              </Paragraph>
              <Space style={{ marginTop: "20px" }}>
                <Link to="/register">
                  <Button type="primary" style={{ background: "#ff1f9c", border: "none", borderRadius: "20px" }}>
                    Sign Up
                  </Button>
                </Link>
                <Link to="/login">
                  <Button type="primary" style={{ background: "#ff1f9c", border: "none", borderRadius: "20px" }}>
                    Login
                  </Button>
                </Link>
              </Space>
            </Card>
          </Content>
        </Layout>
        <MusicPlayer />
      </Layout>
    </AudioPlayerProvider>
  )
}

export default Home
