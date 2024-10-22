import axios from 'axios';

//  Base URL
const API_URL = 'http://localhost:8801/api/auth/';

//  Register route
const register = (email, password) => {
  return axios.post(API_URL + 'register', { email, password });
};

//  Login route
const login = (email, password) => {
  return axios.post(API_URL + 'login', { email, password });
};

//  Logout route
const logout = () => {
  return axios.post(API_URL + 'logout');
};

//  Reset password route
const resetPassword = async (token, newPassword) => {
  const response = axios.post(API_URL + `reset-password?token=${token}`, { newPassword: newPassword });
  return response.data;
};

//  Password reset email trigger
const sendPasswordResetEmail = async (email) => {
  return axios.post(API_URL + 'send-verification-email', { email });
};

//  User profile route
const getUserProfile = (userId) => {
  return axios.get('http://localhost:8801/api/profiles/' + userId);
};

//  Create User service
const UserService = {
  register,
  login,
  logout,
  resetPassword,
  sendPasswordResetEmail,
  getUserProfile
};

export default UserService;