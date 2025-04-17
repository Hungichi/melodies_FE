import axios from 'axios';
import { API_URL } from '../constant/index';
import { logout, setToken as updateToken } from '../store/slice/authSlice';
import { store } from '../store/store';

const config = {
    baseURL: API_URL,
    timeout: 30000,
};

const api = axios.create(config);

const getReduxToken = () => store.getState().auth.token;
const getReduxRefreshToken = () => store.getState().auth.refreshToken;

const refreshToken = async () => {
    try {
        const response = await axios.get(`${API_URL}identity/refresh`, {
            headers: {
                Authorization: `Bearer ${getReduxRefreshToken()}`,
            },
        });

        const newToken = response.data.token;
        store.dispatch(updateToken(newToken)); // Update Redux state with new token
        return newToken;
    } catch (error) {
        console.error('Token refresh failed:', error);
        store.dispatch(logout()); // Clear Redux state and persist
        window.location.assign('/login');
        return Promise.reject(error);
    }
};

api.interceptors.request.use((config) => {
    const token = getReduxToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, Promise.reject);

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newToken = await refreshToken();
                api.defaults.headers.common['Authorization'] =
                    `Bearer ${newToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        if (error.response?.status === 401) {
            store.dispatch(logout());
            window.location.assign('/sign-in');
        }

        return Promise.reject(error);
    }
);

export default api;
