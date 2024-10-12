import axios from 'axios';

const API_URL = 'http://localhost:8801/api/auth/';

const register = (email, password) => {
  return axios.post(API_URL + 'register', { email, password });
};

const login = (email, password) => {
  return axios.post(API_URL + 'login', { email, password });
};

const logout = () => {
  return axios.post(API_URL + 'logout');
};

const resetPassword = (email) => {
  return axios.post(API_URL + 'reset-password', { email });
};

const UserService = {
  register,
  login,
  logout,
  resetPassword,
};

export default UserService;