import axios from 'axios'
import { API_URL } from '../constant'

const config = {
    baseURL: API_URL,
    timeout: 30000,
}

const api = axios.create(config)

// Function to get token from localStorage
const getLocalToken = () => localStorage.getItem('token')
const getLocalRefreshToken = () => localStorage.getItem('refreshToken')

// Function to set token in localStorage
const setToken = (token) => {
    localStorage.setItem('token', token)
}

// Function to refresh token using GET request
const refreshToken = async () => {
    try {
  
        const response = await axios.get(`${API_URL}identity/refresh`, {
            headers: {
                Authorization: `Bearer ${getLocalRefreshToken()}`,
            },
        })
        setToken(response.data.token)

        return response.data.token
    } catch (error) {
        console.error('Token refresh failed:', error)
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        window.location.assign('/sign-in')
        return Promise.reject(error)
    }
}

// Request interceptor to add token to headers
const handleRequest = (config) => {
    const token = getLocalToken()
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
}

// Request error handler
const handleRequestError = (error) => {
    return Promise.reject(error)
}

// Response handler
const handleResponse = (response) => {
    return response
}

// Response error handler
const handleResponseError = async (error) => {
    const originalRequest = error.config

    // Check if the error is due to an expired token and if the request has not been retried
    if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
    ) {
        originalRequest._retry = true

        try {
            const newToken = await refreshToken()
            api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`
            return api(originalRequest)
        } catch (refreshError) {
            console.error(
                'Retrying request failed after token refresh:',
                refreshError,
            )
            return Promise.reject(refreshError)
        }
    }

    // Handle unauthorized access
    if (error.response && error.response.status === 401) {
        console.warn('Unauthorized access, redirecting to login...')
        window.location.assign('/sign-in')
    }

    return Promise.reject(error)
}

api.interceptors.request.use(handleRequest, handleRequestError)
api.interceptors.response.use(handleResponse, handleResponseError)

export default api
