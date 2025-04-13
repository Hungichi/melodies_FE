import axios from 'axios';
import { API_URL } from '../constant'; // Make sure you define the API_URL

// Function to register a new user
const registerUser = async (username, email, password, confirmPassword) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/register`, {
            username,
            email,
            password,
            confirmPassword,
        });

        if (response.data.success) {
            localStorage.setItem('token', response.data.token);
            return response.data.user;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
};

export default registerUser;
