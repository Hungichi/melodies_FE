"use client"

import { useState, useEffect, createContext, useContext, useRef } from "react"

// Audio Player Context
const Playlist = createContext()

function AudioPlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.7)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [queue, setQueue] = useState([])

  const audioRef = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    // Initialize audio element
    audioRef.current = new Audio()

    // Set up event listeners
    const audio = audioRef.current

    const handleTimeUpdate = () => {
      if (audio) {
        setProgress(audio.currentTime)
      }
    }

    const handleLoadedMetadata = () => {
      if (audio) {
        setDuration(audio.duration)
      }
    }

    const handleEnded = () => {
      nextSong()
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)

    // Clean up
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }

      if (audio) {
        audio.pause()
        audio.removeEventListener("timeupdate", handleTimeUpdate)
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
        audio.removeEventListener("ended", handleEnded)
      }
    }
  }, [])

  // Update audio source when current song changes
  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.filePath
      audioRef.current.volume = volume
      audioRef.current.load()

      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error)
          setIsPlaying(false)
        })
      }
    }
  }, [currentSong])

  // Play/pause when isPlaying changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error)
          setIsPlaying(false)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const playSong = (song) => {
    setCurrentSong(song)
    setIsPlaying(true)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const setVolume = (newVolume) => {
    setVolumeState(newVolume)
  }

  const seek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setProgress(time)
    }
  }

  const nextSong = () => {
    if (queue.length > 0) {
      // Play next song in queue
      const nextSong = queue[0]
      const newQueue = queue.slice(1)
      setQueue(newQueue)
      playSong(nextSong)
    } else if (currentSong) {
      // If no queue, just restart current song
      seek(0)
      setIsPlaying(true)
    }
  }

  const prevSong = () => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      // If more than 3 seconds into song, restart it
      seek(0)
    } else if (currentSong) {
      // Otherwise go to previous song (not implemented, would need history)
      // For now, just restart
      seek(0)
    }
  }

  const addToQueue = (song) => {
    setQueue([...queue, song])
  }

  const removeFromQueue = (songId) => {
    setQueue(queue.filter((song) => song.id !== songId))
  }

  const clearQueue = () => {
    setQueue([])
  }

  const value = {
    currentSong,
    isPlaying,
    volume,
    progress,
    duration,
    playSong,
    togglePlay,
    setVolume,
    seek,
    nextSong,
    prevSong,
    queue,
    addToQueue,
    removeFromQueue,
    clearQueue,
  }

  return <Playlist.Provider value={value}>{children}</Playlist.Provider>
}

function useAudioPlayer() {
  const context = useContext(Playlist)
  if (context === undefined) {
    throw new Error("useAudioPlayer must be used within an Playlist")
  }
  return context
}

// Main Playlist Component
function Playlists() {
  // Audio player context
  const { playSong, currentSong, isPlaying, togglePlay } = useAudioPlayer()

  // State for UI
  const [activeView, setActiveView] = useState("list") // 'list' or 'detail'
  const [activePlaylistId, setActivePlaylistId] = useState(null)
  const [loading, setLoading] = useState(true)

  // State for playlists and songs
  const [playlists, setPlaylists] = useState([])
  const [currentPlaylist, setCurrentPlaylist] = useState(null)
  const [playlistSongs, setPlaylistSongs] = useState([])

  // State for modals
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)
  const [isAddSongsModalVisible, setIsAddSongsModalVisible] = useState(false)
  const [formName, setFormName] = useState("")
  const [formDescription, setFormDescription] = useState("")

  // State for search and filter
  const [searchResults, setSearchResults] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSongs, setSelectedSongs] = useState([])
  const [filterQuery, setFilterQuery] = useState("")

  // Mock data for playlists
  const mockPlaylists = {
    favorites: {
      id: "favorites",
      name: "Favorites",
      description: "Songs you've liked",
      coverImage: "https://tse1.mm.bing.net/th?id=OIP.QE_H9FWJP-8ZsVpcJl8zWwHaHa&w=474&h=474&c=7",
      isDefault: true,
    },
    playlist1: {
      id: "playlist1",
      name: "Chill Vibes",
      description: "Relaxing songs for study and work",
      coverImage: "https://tse1.mm.bing.net/th?id=OIP.R3YGoXiCS9EL4UJnTsP6nAHaHa&w=474&h=474&c=7",
      isDefault: false,
    },
    playlist2: {
      id: "playlist2",
      name: "Workout Mix",
      description: "High energy songs for your workout",
      coverImage: "https://tse2.mm.bing.net/th?id=OIP.fRAI7aZlOs_BY_eQYZanOAHaHa&w=474&h=474&c=7",
      isDefault: false,
    },
    playlist3: {
      id: "playlist3",
      name: "Road Trip",
      description: "Perfect songs for long drives",
      coverImage: "https://tse4.mm.bing.net/th?id=OIP.eoyen5qAjXFA0aHNqqr_NAHaHa&w=474&h=474&c=7",
      isDefault: false,
    },
  }

  // Mock data for songs in playlists
  const mockPlaylistSongs = {
    favorites: [
      {
        id: 1,
        title: "Giờ thì",
        artist: "BuiTruongLinh",
        cover:
          "https://i.ytimg.com/vi/ItRExComFJ4/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDmBi5S0ns9U9U25Z04m3xV3mWXKg",
        filePath:
          "https://res.cloudinary.com/dhfy8t9qv/video/upload/v1744872402/y2mate.com_-_Gi%E1%BB%9D_Th%C3%AC_buitruonglinh_i54jdo.mp3",
        duration: "3:45",
        addedAt: "2025-05-01",
      },
      {
        id: 3,
        title: "Chưa phải yêu",
        artist: "HURRYKNG",
        cover:
          "https://i.ytimg.com/vi/tvRo6gajlrk/hqdefault.jpg?sqp=-oaymwExCOADEI4CSFryq4qpAyMIARUAAIhCGAHwAQH4Af4JgALQBYoCDAgAEAEYYiBlKEgwDw==&rs=AOn4CLCEawlmmm6gi3EX0QcJZD-UZZbhxg",
        filePath:
          "https://res.cloudinary.com/dhfy8t9qv/video/upload/v1744872885/y2mate.com_-_HURRYKNG_Ch%C6%B0a_Ph%E1%BA%A3i_L%C3%A0_Y%C3%AAu_feat_REX_Lyrics_Video_r0kaar.mp3",
        duration: "4:12",
        addedAt: "2025-04-28",
      },
    ],
    playlist1: [
      {
        id: 2,
        title: "Phép màu",
        artist: "Đàn cá gỗ",
        cover:
          "https://i.ytimg.com/vi/OkXnZSafFns/hqdefault.jpg?sqp=-oaymwExCOADEI4CSFryq4qpAyMIARUAAIhCGAHwAQH4AbYIgAK4CIoCDAgAEAEYNyBWKHIwDw==&rs=AOn4CLCvFmvPvVXXJRKWbC8dB9tgZXOGKg",
        filePath:
          "https://res.cloudinary.com/dhfy8t9qv/video/upload/v1744872962/y2mate.com_-_Ph%C3%A9p_M%C3%A0u_%C4%90%C3%A0n_C%C3%A1_G%E1%BB%97_Original_Soundtrack_a8yqba.mp3",
        duration: "3:22",
        addedAt: "2025-05-02",
      },
      {
        id: 5,
        title: "Vùng ký ức",
        artist: "Chillies",
        cover:
          "https://i.ytimg.com/vi/T0sHaz4H9MQ/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBVvWZ0jr7P8EWi_xkDbhMqbtpb5g",
        filePath:
          "https://res.cloudinary.com/dhfy8t9qv/video/upload/v1744874251/utomp3.com_-_V%C3%B9ng_K%C3%BD_%E1%BB%A8c_Chillies_Official_Music_Video_m5feln.mp3",
        duration: "4:05",
        addedAt: "2025-04-30",
      },
    ],
    playlist2: [
      {
        id: 7,
        title: "Dancing In The Dark",
        artist: "SOOBIN",
        cover:
          "https://i.ytimg.com/vi/OZmK0YuSmXU/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCPG30-OAdTn5SuBabto2Z5kfspFw",
        filePath:
          "https://res.cloudinary.com/dhfy8t9qv/video/upload/v1744874244/utomp3.com_-_SOOBIN_Dancing_In_The_Dark_B%E1%BA%ACT_N%C3%93_L%C3%8AN_Album_Official_MV_f2c7n6.mp3",
        duration: "3:18",
        addedAt: "2025-05-03",
      },
    ],
    playlist3: [
      {
        id: 4,
        title: "Lời nói dối chân thật",
        artist: "Tlinh",
        cover:
          "https://i.ytimg.com/vi/koRbmP0BbNk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCT2wJjFI0W_RsfqWV0AsQ3FymMAg",
        filePath:
          "https://res.cloudinary.com/dhfy8t9qv/video/upload/v1744873331/utomp3.com_-_tlinh_L%E1%BB%9Di_N%C3%B3i_D%E1%BB%91i_Ch%C3%A2n_Th%E1%BA%ADt_ft_JustaTee_Live_from_GENfest_2024_o1tt8o.mp3",
        duration: "4:30",
        addedAt: "2025-04-29",
      },
      {
        id: 6,
        title: "Người bình thường",
        artist: "Vũ Cát Tường",
        cover:
          "https://i.ytimg.com/vi/X5KvHXWPYm4/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAyMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAwL9MqR7lqZumeOQYbipqV2hhl2w",
        filePath:
          "https://res.cloudinary.com/dhfy8t9qv/video/upload/v1744874238/utomp3.com_-_NG%C6%AF%E1%BB%9CI_B%C3%8CNH_TH%C6%AF%E1%BB%9CNG_V%C5%A8_C%C3%81T_T%C6%AF%E1%BB%9CNG_OFFICIAL_VISUALIZER_ohlspi.mp3",
        duration: "3:55",
        addedAt: "2025-05-01",
      },
      {
        id: 8,
        title: "Bầu trời mới",
        artist: "DaLAB",
        cover:
          "https://i.ytimg.com/vi/Z1D26z9l8y8/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCvdXisBF7b9ORftL0l2m2AZhqGYg",
        filePath:
          "https://res.cloudinary.com/dhfy8t9qv/video/upload/v1744874235/utomp3.com_-_B%E1%BA%A7u_Tr%E1%BB%9Di_M%E1%BB%9Bi_Da_LAB_ft_Minh_T%E1%BB%91c_Lam_Official_MV_tiint4.mp3",
        duration: "4:15",
        addedAt: "2025-04-27",
      },
    ],
  }

  // Mock data for all songs
  const mockAllSongs = [
    {
      id: 1,
      title: "Giờ thì",
      artist: "BuiTruongLinh",
      cover:
        "https://i.ytimg.com/vi/ItRExComFJ4/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDmBi5S0ns9U9U25Z04m3xV3mWXKg",
      filePath:
        "https://res.cloudinary.com/dhfy8t9qv/video/upload/v1744872402/y2mate.com_-_Gi%E1%BB%9D_Th%C3%AC_buitruonglinh_i54jdo.mp3",
      duration: "3:45",
    },
    {
      id: 2,
      title: "Phép màu",
      artist: "Đàn cá gỗ",
      cover:
        "https://i.ytimg.com/vi/OkXnZSafFns/hqdefault.jpg?sqp=-oaymwExCOADEI4CSFryq4qpAyMIARUAAIhCGAHwAQH4AbYIgAK4CIoCDAgAEAEYNyBWKHIwDw==&rs=AOn4CLCvFmvPvVXXJRKWbC8dB9tgZXOGKg",
      filePath:
        "https://res.cloudinary.com/dhfy8t9qv/video/upload/v1744872962/y2mate.com_-_Ph%C3%A9p_M%C3%A0u_%C4%90%C3%A0n_C%C3%A1_G%E1%BB%97_Original_Soundtrack_a8yqba.mp3",
      duration: "3:22",
    },
    {
      id: 3,
      title: "Chưa phải yêu",
      artist: "HURRYKNG",
      cover:
        "https://i.ytimg.com/vi/tvRo6gajlrk/hqdefault.jpg?sqp=-oaymwExCOADEI4CSFryq4qpAyMIARUAAIhCGAHwAQH4Af4JgALQBYoCDAgAEAEYYiBlKEgwDw==&rs=AOn4CLCEawlmmm6gi3EX0QcJZD-UZZbhxg",
      filePath:
        "https://res.cloudinary.com/dhfy8t9qv/video/upload/v1744872885/y2mate.com_-_HURRYKNG_Ch%C6%B0a_Ph%E1%BA%A3i_L%C3%A0_Y%C3%AAu_feat_REX_Lyrics_Video_r0kaar.mp3",
      duration: "4:12",
    },
    {
      id: 4,
      title: "Lời nói dối chân thật",
      artist: "Tlinh",
      cover:
        "https://i.ytimg.com/vi/koRbmP0BbNk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCT2wJjFI0W_RsfqWV0AsQ3FymMAg",
      filePath:
        "https://res.cloudinary.com/dhfy8t9qv/video/upload/v1744873331/utomp3.com_-_tlinh_L%E1%BB%9Di_N%C3%B3i_D%E1%BB%91i_Ch%C3%A2n_Th%E1%BA%ADt_ft_JustaTee_Live_from_GENfest_2024_o1tt8o.mp3",
      duration: "4:30",
    },
    {
      id: 5,
      title: "Vùng ký ức",
      artist: "Chillies",
      cover:
        "https://i.ytimg.com/vi/T0sHaz4H9MQ/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBVvWZ0jr7P8EWi_xkDbhMqbtpb5g",
      filePath:
        "https://res.cloudinary.com/dhfy8t9qv/video/upload/v1744874251/utomp3.com_-_V%C3%B9ng_K%C3%BD_%E1%BB%A8c_Chillies_Official_Music_Video_m5feln.mp3",
      duration: "4:05",
    },
    {
      id: 6,
      title: "Người bình thường",
      artist: "Vũ Cát Tường",
      cover:
        "https://i.ytimg.com/vi/X5KvHXWPYm4/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAyMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAwL9MqR7lqZumeOQYbipqV2hhl2w",
      filePath:
        "https://res.cloudinary.com/dhfy8t9qv/video/upload/v1744874238/utomp3.com_-_NG%C6%AF%E1%BB%9CI_B%C3%8CNH_TH%C6%AF%E1%BB%9CNG_V%C5%A8_C%C3%81T_T%C6%AF%E1%BB%9CNG_OFFICIAL_VISUALIZER_ohlspi.mp3",
      duration: "3:55",
    },
    {
      id: 7,
      title: "Dancing In The Dark",
      artist: "SOOBIN",
      cover:
        "https://i.ytimg.com/vi/OZmK0YuSmXU/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAyMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCPG30-OAdTn5SuBabto2Z5kfspFw",
      filePath:
        "https://res.cloudinary.com/dhfy8t9qv/video/upload/v1744874244/utomp3.com_-_SOOBIN_Dancing_In_The_Dark_B%E1%BA%ACT_N%C3%93_L%C3%8AN_Album_Official_MV_f2c7n6.mp3",
      duration: "3:18",
    },
    {
      id: 8,
      title: "Bầu trời mới",
      artist: "DaLAB",
      cover:
        "https://i.ytimg.com/vi/Z1D26z9l8y8/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCvdXisBF7b9ORftL0l2m2AZhqGYg",
      filePath:
        "https://res.cloudinary.com/dhfy8t9qv/video/upload/v1744874235/utomp3.com_-_B%E1%BA%A7u_Tr%E1%BB%9Di_M%E1%BB%9Bi_Da_LAB_ft_Minh_T%E1%BB%91c_Lam_Official_MV_tiint4.mp3",
      duration: "4:15",
    },
    {
      id: 9,
      title: "Nàng thơ",
      artist: "Hoàng Dũng",
      cover: "https://tse4.mm.bing.net/th?id=OIP.FE9pO0f7qa92_W16gnq-2QHaLH&w=474&h=474&c=7",
      filePath: "https://example.com/song9.mp3",
      duration: "4:25",
    },
    {
      id: 10,
      title: "Tình yêu xanh lá",
      artist: "Thịnh Suy",
      cover: "https://tse1.mm.bing.net/th?id=OIP.QE_H9FWJP-8ZsVpcJl8zWwHaHa&w=474&h=474&c=7",
      filePath: "https://example.com/song10.mp3",
      duration: "3:47",
    },
  ]

  // Fetch playlists on component mount
  useEffect(() => {
    fetchPlaylists()
  }, [])

  // Fetch playlists
  const fetchPlaylists = () => {
    setLoading(true)
    // Simulating API call with setTimeout
    setTimeout(() => {
      const playlistsArray = Object.values(mockPlaylists).map((playlist) => {
        const songs = mockPlaylistSongs[playlist.id] || []
        return {
          ...playlist,
          songCount: songs.length,
        }
      })
      setPlaylists(playlistsArray)
      setLoading(false)
    }, 1000)
  }

  // Open playlist detail view
  const openPlaylistDetail = (playlistId) => {
    setLoading(true)
    setActivePlaylistId(playlistId)

    // Simulating API call with setTimeout
    setTimeout(() => {
      setCurrentPlaylist(mockPlaylists[playlistId])
      setPlaylistSongs(mockPlaylistSongs[playlistId] || [])
      setActiveView("detail")
      setLoading(false)
    }, 500)
  }

  // Go back to playlist list view
  const goBackToList = () => {
    setActiveView("list")
    setActivePlaylistId(null)
    setCurrentPlaylist(null)
    setPlaylistSongs([])
    setFilterQuery("")
  }

  // Handle create playlist
  const handleCreatePlaylist = () => {
    if (!formName) {
      alert("Please enter a playlist name")
      return
    }

    // In a real app, this would be an API call to create a playlist
    const newId = `playlist${Date.now()}`
    const newPlaylist = {
      id: newId,
      name: formName,
      description: formDescription || "No description",
      coverImage: "https://placehold.co/400x400/3d2a3a/white?text=New+Playlist",
      isDefault: false,
    }

    mockPlaylists[newId] = newPlaylist
    mockPlaylistSongs[newId] = []

    const updatedPlaylists = [...playlists, { ...newPlaylist, songCount: 0 }]
    setPlaylists(updatedPlaylists)

    alert(`Playlist "${formName}" created successfully!`)
    setIsCreateModalVisible(false)
    setFormName("")
    setFormDescription("")
  }

  // Handle delete playlist
  const handleDeletePlaylist = (playlistId, playlistName) => {
    if (confirm(`Are you sure you want to delete "${playlistName}"? This action cannot be undone.`)) {
      // In a real app, this would be an API call to delete a playlist
      delete mockPlaylists[playlistId]
      delete mockPlaylistSongs[playlistId]

      const updatedPlaylists = playlists.filter((playlist) => playlist.id !== playlistId)
      setPlaylists(updatedPlaylists)

      alert(`Playlist "${playlistName}" deleted successfully!`)
    }
  }

  // Handle search for songs to add to playlist
  const handleSearch = (value) => {
    setSearchQuery(value)
    setSearchLoading(true)

    // Simulating API call with setTimeout
    setTimeout(() => {
      // Filter songs based on search query
      const filteredSongs = mockAllSongs.filter(
        (song) =>
          song.title.toLowerCase().includes(value.toLowerCase()) ||
          song.artist.toLowerCase().includes(value.toLowerCase()),
      )

      // Filter out songs that are already in the playlist
      const songsNotInPlaylist = filteredSongs.filter(
        (searchSong) => !playlistSongs.some((playlistSong) => playlistSong.id === searchSong.id),
      )

      setSearchResults(songsNotInPlaylist)
      setSearchLoading(false)
    }, 800)
  }

  // Handle selecting a song in the add songs modal
  const handleSelectSong = (song) => {
    const isSelected = selectedSongs.some((s) => s.id === song.id)

    if (isSelected) {
      setSelectedSongs(selectedSongs.filter((s) => s.id !== song.id))
    } else {
      setSelectedSongs([...selectedSongs, song])
    }
  }

  // Handle adding selected songs to the playlist
  const handleAddSongs = () => {
    if (selectedSongs.length === 0) return

    // In a real app, this would be an API call to add songs to the playlist
    const songsToAdd = selectedSongs.map((song) => ({
      ...song,
      addedAt: new Date().toISOString().split("T")[0],
    }))

    const updatedSongs = [...playlistSongs, ...songsToAdd]
    setPlaylistSongs(updatedSongs)
    mockPlaylistSongs[activePlaylistId] = updatedSongs

    // Update playlist count in the playlists list
    const updatedPlaylists = playlists.map((p) => {
      if (p.id === activePlaylistId) {
        return { ...p, songCount: updatedSongs.length }
      }
      return p
    })
    setPlaylists(updatedPlaylists)

    alert(`${selectedSongs.length} song(s) added to playlist.`)

    setSelectedSongs([])
    setSearchResults([])
    setSearchQuery("")
    setIsAddSongsModalVisible(false)
  }

  // Handle removing a song from the playlist
  const handleRemoveFromPlaylist = (songId, songTitle) => {
    if (confirm(`Are you sure you want to remove "${songTitle}" from this playlist?`)) {
      // In a real app, this would be an API call to remove a song from the playlist
      const updatedSongs = playlistSongs.filter((song) => song.id !== songId)
      setPlaylistSongs(updatedSongs)
      mockPlaylistSongs[activePlaylistId] = updatedSongs

      // Update playlist count in the playlists list
      const updatedPlaylists = playlists.map((p) => {
        if (p.id === activePlaylistId) {
          return { ...p, songCount: updatedSongs.length }
        }
        return p
      })
      setPlaylists(updatedPlaylists)

      alert(`"${songTitle}" removed from playlist.`)
    }
  }

  // Handle toggling favorite (for the Favorites playlist)
  const handleToggleFavorite = (song) => {
    if (activePlaylistId === "favorites") {
      // If we're in the Favorites playlist, remove the song
      handleRemoveFromPlaylist(song.id, song.title)
    } else {
      // In a real app, this would be an API call to add/remove from favorites
      const favorites = mockPlaylistSongs.favorites || []
      const songExists = favorites.some((s) => s.id === song.id)

      if (!songExists) {
        mockPlaylistSongs.favorites = [
          ...favorites,
          {
            ...song,
            addedAt: new Date().toISOString().split("T")[0],
          },
        ]

        // Update favorites count in the playlists list
        const updatedPlaylists = playlists.map((p) => {
          if (p.id === "favorites") {
            return { ...p, songCount: mockPlaylistSongs.favorites.length }
          }
          return p
        })
        setPlaylists(updatedPlaylists)
      }

      alert(`"${song.title}" added to Favorites.`)
    }
  }

  // Handle playing a song
  const handlePlaySong = (song) => {
    if (currentSong && currentSong.id === song.id) {
      togglePlay()
    } else {
      playSong(song)
    }
  }

  // Handle playing all songs in the playlist
  const handlePlayAll = () => {
    if (playlistSongs.length > 0) {
      playSong(playlistSongs[0])
    }
  }

  // Filter songs based on search query
  const filteredSongs = filterQuery
    ? playlistSongs.filter(
        (song) =>
          song.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(filterQuery.toLowerCase()),
      )
    : playlistSongs

  // Styles
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#1a1221",
      color: "#fff",
      fontFamily: "Arial, sans-serif",
    },
    content: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "24px",
      paddingBottom: "80px",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
      flexWrap: "wrap",
      gap: "16px",
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      margin: 0,
    },
    button: {
      backgroundColor: "#ff1f9c",
      color: "white",
      border: "none",
      borderRadius: "20px",
      padding: "8px 16px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "14px",
      fontWeight: "bold",
    },
    outlineButton: {
      backgroundColor: "transparent",
      color: "white",
      border: "1px solid #3d2a3a",
      borderRadius: "20px",
      padding: "8px 16px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "14px",
    },
    iconButton: {
      backgroundColor: "transparent",
      color: "white",
      border: "none",
      borderRadius: "50%",
      width: "36px",
      height: "36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "16px",
    },
    card: {
      backgroundColor: "#3d2a3a",
      borderRadius: "8px",
      overflow: "hidden",
      transition: "transform 0.2s",
      cursor: "pointer",
    },
    cardHover: {
      transform: "translateY(-5px)",
    },
    cardImage: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
    },
    cardContent: {
      padding: "16px",
    },
    cardTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "8px",
    },
    cardDescription: {
      fontSize: "14px",
      color: "rgba(255, 255, 255, 0.7)",
      marginBottom: "8px",
    },
    cardFooter: {
      display: "flex",
      justifyContent: "space-between",
      padding: "8px 16px 16px",
    },
    badge: {
      backgroundColor: "#ff1f9c",
      color: "white",
      padding: "2px 8px",
      borderRadius: "10px",
      fontSize: "12px",
      position: "absolute",
      top: "10px",
      right: "10px",
    },
    modal: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: "#2a1e2d",
      borderRadius: "8px",
      padding: "24px",
      width: "90%",
      maxWidth: "500px",
      maxHeight: "90vh",
      overflow: "auto",
    },
    modalHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "16px",
    },
    modalTitle: {
      fontSize: "20px",
      fontWeight: "bold",
    },
    formGroup: {
      marginBottom: "16px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontSize: "14px",
    },
    input: {
      width: "100%",
      padding: "8px 12px",
      backgroundColor: "#3d2a3a",
      border: "1px solid #4d3a4d",
      borderRadius: "4px",
      color: "white",
      fontSize: "14px",
    },
    textarea: {
      width: "100%",
      padding: "8px 12px",
      backgroundColor: "#3d2a3a",
      border: "1px solid #4d3a4d",
      borderRadius: "4px",
      color: "white",
      fontSize: "14px",
      minHeight: "100px",
      resize: "vertical",
    },
    modalFooter: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "8px",
      marginTop: "16px",
    },
    playlistDetail: {
      display: "flex",
      marginBottom: "24px",
      flexWrap: "wrap",
      gap: "24px",
    },
    playlistImage: {
      width: "200px",
      height: "200px",
      objectFit: "cover",
      borderRadius: "8px",
    },
    playlistInfo: {
      flex: 1,
      minWidth: "300px",
    },
    songsList: {
      backgroundColor: "#3d2a3a",
      borderRadius: "8px",
      padding: "16px",
      marginBottom: "24px",
    },
    songsHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "16px",
    },
    songItem: {
      display: "flex",
      alignItems: "center",
      padding: "12px 0",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    },
    songItemPlaying: {
      backgroundColor: "rgba(255, 31, 156, 0.1)",
    },
    songCover: {
      width: "50px",
      height: "50px",
      borderRadius: "4px",
      marginRight: "16px",
      position: "relative",
      cursor: "pointer",
    },
    songCoverOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      borderRadius: "4px",
      opacity: 0,
      transition: "opacity 0.2s",
    },
    songCoverOverlayVisible: {
      opacity: 1,
    },
    songInfo: {
      flex: 1,
    },
    songTitle: {
      fontWeight: "bold",
      marginBottom: "4px",
    },
    songArtist: {
      fontSize: "14px",
      color: "rgba(255, 255, 255, 0.7)",
    },
    songMeta: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      color: "rgba(255, 255, 255, 0.5)",
      fontSize: "14px",
    },
    songActions: {
      display: "flex",
      gap: "8px",
    },
    loadingContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "50vh",
    },
    spinner: {
      border: "4px solid rgba(255, 255, 255, 0.1)",
      borderTop: "4px solid #ff1f9c",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      animation: "spin 1s linear infinite",
    },
    emptyState: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 0",
    },
    emptyStateText: {
      color: "rgba(255, 255, 255, 0.7)",
      marginTop: "16px",
    },
    searchInput: {
      position: "relative",
      width: "100%",
      maxWidth: "300px",
    },
    searchIcon: {
      position: "absolute",
      left: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "rgba(255, 255, 255, 0.5)",
    },
    checkboxContainer: {
      display: "flex",
      alignItems: "center",
      marginRight: "12px",
    },
    checkbox: {
      width: "16px",
      height: "16px",
      accentColor: "#ff1f9c",
    },
    scrollArea: {
      maxHeight: "400px",
      overflow: "auto",
      padding: "0 4px",
    },
    backButton: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      backgroundColor: "transparent",
      color: "white",
      border: "none",
      padding: "8px",
      cursor: "pointer",
      marginBottom: "16px",
    },
    playingBadge: {
      backgroundColor: "#ff1f9c",
      color: "white",
      padding: "2px 8px",
      borderRadius: "10px",
      fontSize: "12px",
      marginLeft: "8px",
    },
  }

  // Render playlist list view
  const renderPlaylistsView = () => {
    return (
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Your Playlists</h1>
          <button style={styles.button} onClick={() => setIsCreateModalVisible(true)}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Create Playlist
          </button>
        </div>

        {/* Playlists Grid */}
        {loading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
          </div>
        ) : playlists.length === 0 ? (
          <div style={styles.emptyState}>
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            <p style={styles.emptyStateText}>No playlists found</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {playlists.map((playlist) => (
              <div key={playlist.id} style={styles.card} onClick={() => openPlaylistDetail(playlist.id)}>
                <div style={{ position: "relative" }}>
                  <img
                    alt={playlist.name}
                    src={playlist.coverImage || "https://placehold.co/400x400/3d2a3a/white?text=No+Image"}
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = "https://placehold.co/400x400/3d2a3a/white?text=No+Image"
                    }}
                    style={styles.cardImage}
                  />
                  {playlist.isDefault && <div style={styles.badge}>Default</div>}
                </div>
                <div style={styles.cardContent}>
                  <h3 style={styles.cardTitle}>{playlist.name}</h3>
                  <p style={styles.cardDescription}>{playlist.description}</p>
                  <div style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "14px" }}>{playlist.songCount} songs</div>
                </div>
                <div style={styles.cardFooter}>
                  <button
                    style={{ ...styles.iconButton, color: "#ff1f9c" }}
                    onClick={(e) => {
                      e.stopPropagation()
                      openPlaylistDetail(playlist.id)
                      if (mockPlaylistSongs[playlist.id]?.length > 0) {
                        handlePlayAll()
                      }
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </button>
                  <button
                    style={styles.iconButton}
                    onClick={(e) => {
                      e.stopPropagation()
                      openPlaylistDetail(playlist.id)
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  {!playlist.isDefault && (
                    <button
                      style={styles.iconButton}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeletePlaylist(playlist.id, playlist.name)
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Playlist Modal */}
        {isCreateModalVisible && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>Create New Playlist</h2>
                <button style={styles.iconButton} onClick={() => setIsCreateModalVisible(false)}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Playlist Name</label>
                <input
                  type="text"
                  placeholder="Enter playlist name"
                  style={styles.input}
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  placeholder="Enter playlist description (optional)"
                  style={styles.textarea}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                />
              </div>
              <div style={styles.modalFooter}>
                <button
                  style={{ ...styles.outlineButton, borderColor: "#4d3a4d" }}
                  onClick={() => setIsCreateModalVisible(false)}
                >
                  Cancel
                </button>
                <button style={styles.button} onClick={handleCreatePlaylist}>
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Render playlist detail view
  const renderPlaylistDetailView = () => {
    if (loading) {
      return (
        <div style={styles.content}>
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
          </div>
        </div>
      )
    }

    if (!currentPlaylist) {
      return (
        <div style={styles.content}>
          <div style={styles.emptyState}>
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            <p style={styles.emptyStateText}>Playlist not found</p>
          </div>
        </div>
      )
    }

    return (
      <div style={styles.content}>
        {/* Back button */}
        <button style={styles.backButton} onClick={goBackToList}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Playlists
        </button>

        {/* Playlist Header */}
        <div style={styles.playlistDetail}>
          <img
            src={currentPlaylist.coverImage || "https://placehold.co/400x400/3d2a3a/white?text=No+Image"}
            alt={currentPlaylist.name}
            onError={(e) => {
              e.target.onerror = null
              e.target.src = "https://placehold.co/400x400/3d2a3a/white?text=No+Image"
            }}
            style={styles.playlistImage}
          />
          <div style={styles.playlistInfo}>
            <div style={{ marginBottom: "8px" }}>
              {currentPlaylist.isDefault && (
                <span style={styles.badge}>{currentPlaylist.id === "favorites" ? "Favorites" : "Default"}</span>
              )}
            </div>
            <h1 style={styles.title}>{currentPlaylist.name}</h1>
            <p style={{ color: "rgba(255, 255, 255, 0.7)", marginTop: "8px" }}>{currentPlaylist.description}</p>
            <div style={{ color: "rgba(255, 255, 255, 0.5)", marginTop: "8px", fontSize: "14px" }}>
              {playlistSongs.length} {playlistSongs.length === 1 ? "song" : "songs"}
            </div>
            <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
              <button style={styles.button} onClick={handlePlayAll} disabled={playlistSongs.length === 0}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                Play All
              </button>
              <button style={styles.outlineButton} onClick={() => setIsAddSongsModalVisible(true)}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Songs
              </button>
            </div>
          </div>
        </div>

        {/* Songs List */}
        <div style={styles.songsList}>
          <div style={styles.songsHeader}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>Songs</h2>
            {playlistSongs.length > 0 && (
              <div style={styles.searchInput}>
                <span style={styles.searchIcon}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Filter songs"
                  style={{ ...styles.input, paddingLeft: "36px" }}
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                />
              </div>
            )}
          </div>

          {playlistSongs.length === 0 ? (
            <div style={styles.emptyState}>
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18V5l12-2v13"></path>
                <circle cx="6" cy="18" r="3"></circle>
                <circle cx="18" cy="16" r="3"></circle>
              </svg>
              <p style={styles.emptyStateText}>No songs in this playlist</p>
            </div>
          ) : filteredSongs.length === 0 ? (
            <div style={styles.emptyState}>
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <p style={styles.emptyStateText}>No songs match your filter</p>
            </div>
          ) : (
            <div style={styles.scrollArea}>
              {filteredSongs.map((song) => {
                const isCurrentlyPlaying = currentSong && currentSong.id === song.id && isPlaying

                return (
                  <div
                    key={song.id}
                    style={{
                      ...styles.songItem,
                      ...(isCurrentlyPlaying ? styles.songItemPlaying : {}),
                    }}
                  >
                    <div style={styles.songCover} onClick={() => handlePlaySong(song)}>
                      <img
                        src={song.cover || "https://placehold.co/100x100/3d2a3a/white?text=No+Image"}
                        alt={song.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "4px" }}
                      />
                      <div
                        style={{
                          ...styles.songCoverOverlay,
                          ...(isCurrentlyPlaying ? styles.songCoverOverlayVisible : {}),
                        }}
                      >
                        {isCurrentlyPlaying ? (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="6" y="4" width="4" height="16"></rect>
                            <rect x="14" y="4" width="4" height="16"></rect>
                          </svg>
                        ) : (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        )}
                      </div>
                    </div>
                    <div style={styles.songInfo}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={styles.songTitle}>{song.title}</span>
                        {isCurrentlyPlaying && <span style={styles.playingBadge}>Playing</span>}
                      </div>
                      <div style={styles.songArtist}>{song.artist}</div>
                    </div>
                    <div style={styles.songMeta}>
                      <span>{song.duration}</span>
                      <span>Added: {song.addedAt}</span>
                    </div>
                    <div style={styles.songActions}>
                      <button style={styles.iconButton} onClick={() => handleToggleFavorite(song)}>
                        {currentPlaylist.id === "favorites" ? (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="#ff1f9c"
                            stroke="#ff1f9c"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                        ) : (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                        )}
                      </button>
                      <button style={styles.iconButton} onClick={() => handleRemoveFromPlaylist(song.id, song.title)}>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Add Songs Modal */}
        {isAddSongsModalVisible && (
          <div style={styles.modal}>
            <div style={{ ...styles.modalContent, maxWidth: "600px" }}>
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>Add Songs to Playlist</h2>
                <button
                  style={styles.iconButton}
                  onClick={() => {
                    setIsAddSongsModalVisible(false)
                    setSelectedSongs([])
                    setSearchResults([])
                    setSearchQuery("")
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div style={{ ...styles.searchInput, maxWidth: "100%", marginBottom: "16px" }}>
                <span style={styles.searchIcon}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search for songs by title or artist"
                  style={{ ...styles.input, paddingLeft: "36px" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch(searchQuery)}
                />
                <button
                  style={{ ...styles.button, position: "absolute", right: "0", top: "0", borderRadius: "0 4px 4px 0" }}
                  onClick={() => handleSearch(searchQuery)}
                  disabled={searchLoading}
                >
                  {searchLoading ? "Searching..." : "Search"}
                </button>
              </div>

              {searchQuery && !searchLoading && searchResults.length === 0 && (
                <div style={{ ...styles.emptyState, padding: "20px 0" }}>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <p style={styles.emptyStateText}>No songs found</p>
                </div>
              )}

              {searchLoading ? (
                <div style={{ ...styles.loadingContainer, height: "200px" }}>
                  <div style={styles.spinner}></div>
                </div>
              ) : (
                <div style={styles.scrollArea}>
                  {searchResults.map((song) => {
                    const isSelected = selectedSongs.some((s) => s.id === song.id)

                    return (
                      <div
                        key={song.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "8px",
                          marginBottom: "8px",
                          borderRadius: "4px",
                          backgroundColor: isSelected ? "rgba(255, 31, 156, 0.1)" : "transparent",
                          cursor: "pointer",
                        }}
                        onClick={() => handleSelectSong(song)}
                      >
                        <div style={styles.checkboxContainer}>
                          <input type="checkbox" checked={isSelected} onChange={() => {}} style={styles.checkbox} />
                        </div>
                        <img
                          src={song.cover || "https://placehold.co/100x100/3d2a3a/white?text=No+Image"}
                          alt={song.title}
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                            borderRadius: "4px",
                            marginRight: "12px",
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: "bold" }}>{song.title}</div>
                          <div style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.7)" }}>{song.artist}</div>
                        </div>
                        <div style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "14px" }}>{song.duration}</div>
                      </div>
                    )
                  })}
                </div>
              )}

              <div style={styles.modalFooter}>
                <button
                  style={{ ...styles.outlineButton, borderColor: "#4d3a4d" }}
                  onClick={() => {
                    setIsAddSongsModalVisible(false)
                    setSelectedSongs([])
                    setSearchResults([])
                    setSearchQuery("")
                  }}
                >
                  Cancel
                </button>
                <button
                  style={{ ...styles.button, opacity: selectedSongs.length === 0 ? 0.5 : 1 }}
                  onClick={handleAddSongs}
                  disabled={selectedSongs.length === 0}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Add {selectedSongs.length > 0 ? `(${selectedSongs.length})` : ""}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={styles.container}>{activeView === "list" ? renderPlaylistsView() : renderPlaylistDetailView()}</div>
  )
}

export default function PlaylistsWithProvider() {
  return (
    <AudioPlayerProvider>
      <Playlists />
    </AudioPlayerProvider>
  )
}
