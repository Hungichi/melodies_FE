import api from '../../config/axios';
import { setUserProfile, setUserProfileError, setUserProfileLoading } from '../slice/userProfileSlice';
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

export const fetchCurrentUserProfile = () => async (dispatch) => {
    dispatch(setUserProfileLoading());
    try {
        const res = await api.get('/api/auth/me');
        console.log(res.data.user)
        dispatch(setUserProfile(res.data.user));
    } catch (err) {
        dispatch(setUserProfileError(err.response?.data?.message || 'Failed to fetch profile data'));
    }
};