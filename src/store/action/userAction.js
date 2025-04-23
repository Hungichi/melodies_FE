import api from '../../config/axios';
import { setUserProfile, setUserProfileError } from '../slice/userProfileSlice';
export const updateUserProfile = async (formValues) => {
    try {
        const res = await api.put('/api/auth/update-profile', {
            userId: formValues.userId,
            fullName: formValues.fullName,
            dateOfBirth: formValues.dateOfBirth,
            bio: formValues.bio,
            location: formValues.location,
            profileImage: formValues.profileImage,
        });

        return res.data;
    } catch (err) {
        console.error('Update profile error:', err);
        throw err.response?.data || { message: 'Unknown error occurred' };
    }
};

export const fetchCurrentUserProfile = async () => {
    try {
        const res = await api.get('/api/auth/me');
        const { success, user } = res.data
        if (success) {
            setUserProfile(user)
        }
        return user
    } catch (err) {
        setUserProfileError(err.response?.data?.message || 'Failed to fetch profile data');
    }
};