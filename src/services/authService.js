import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

let currentUser = null;

const authService = {
  // Đăng ký
  async register(userData) {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      if (response.data.token) {
        currentUser = response.data;
        window.dispatchEvent(new Event('authChange'));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Đăng nhập
  async login(credentials) {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      if (response.data.token) {
        currentUser = response.data;
        window.dispatchEvent(new Event('authChange'));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Đăng xuất
  logout() {
    currentUser = null;
    window.dispatchEvent(new Event('authChange'));
  },

  // Lấy thông tin user hiện tại
  getCurrentUser() {
    return currentUser;
  },

  // Kiểm tra đã đăng nhập chưa
  isAuthenticated() {
    return !!currentUser;
  },

  getToken() {
    return currentUser?.token;
  }
};

export default authService; 