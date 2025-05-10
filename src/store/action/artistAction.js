import api from "../../config/axios";

export const createSongArtist = (formData) => {
    return api.post('/api/songs', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const getAllSongArtist = (page = 1, limit = 10, genre = '', search = '', sort = '-createdAt') => {
    return api
        .get('api/songs', {
            params: { page, limit, genre, search, sort }
        })
        .then(res => res.data);
};