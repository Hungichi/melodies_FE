import api from '../../config/axios';
import { setUserProfile, setUserProfileError } from '../slice/userProfileSlice';
export const updateUserProfile = async (formValues) => {
    try {
        const res = await api.put('/api/auth/profile', {
            userId: formValues.userId,
            fullName: formValues.fullName,
            dateOfBirth: formValues.dateOfBirth,
            bio: formValues.bio,
            location: formValues.location,
            profileImage: formValues.profileImage,
        });
        const { success, user } = res.data;
        if (success) {
            setUserProfile(user);
        }
        return user;
    } catch (err) {
        console.error('Update profile error:', err);
        throw err.response?.data || { message: 'Unknown error occurred' };
    }
};

export const fetchCurrentUserProfile = async () => {
    try {
        const res = await api.get('/api/auth/me');
        const { success, user } = res.data;
        if (success) {
            setUserProfile(user);
        }
        return user;
    } catch (err) {
        setUserProfileError(
            err.response?.data?.message || 'Failed to fetch profile data'
        );
    }
};

export const getSongDetail = async (id) => {
    const response = await api.get(`api/songs/${id}`);
    return response;
};
export const getSongGenres = async () => {
    const response = await api.get(`api/songs/genres`);
    return response.data;
};

export const getTrendingSongs = async () => {
    const response = await api.get('api/songs/trending')
    return response.data;
}

export const likeSongs = async (id) => {
    const response = await api.post(`api/songs/${id}/like`)
    return response.data;
}

export const commentSongs = async (id, data) => {
    const response = await api.post(`api/songs/${id}/comments`, { text: data })
    return response.data;
}