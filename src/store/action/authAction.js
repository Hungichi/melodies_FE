import api from '../../config/axios';
import { setRefreshToken, setToken, setUser } from '../slice/authSlice';
import { store } from '../store';
export const registerUser = async (
    username,
    email,
    password,
    confirmPassword
) => {
    try {
        const response = await api.post('/api/auth/register', {
            username,
            email,
            password,
            confirmPassword,
        });

        if (response.data.success) {
            const { token, refreshToken, user } = response.data;
            // Store the token and refreshToken in Redux
            if (token) store.dispatch(setToken(token));
            if (refreshToken) store.dispatch(setRefreshToken(refreshToken));

            return user;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
};
export const loginUser = async (email, password) => {
    try {
        const response = await api.post('/api/auth/login', {
            email,
            password,
        });

        if (response.data.success) {
            const { token, refreshToken, user } = response.data;

            if (token) store.dispatch(setToken(token));
            if (refreshToken) store.dispatch(setRefreshToken(refreshToken));

            return user;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};
