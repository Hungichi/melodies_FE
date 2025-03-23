import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Song APIs
export const songApi = {
  getAllSongs: () => api.get('/songs'),
  getSong: (id) => api.get(`/songs/${id}`),
  createSong: (formData) => api.post('/songs', formData),
  updateSong: (id, formData) => api.put(`/songs/${id}`, formData),
  deleteSong: (id) => api.delete(`/songs/${id}`),
};

export default api; 