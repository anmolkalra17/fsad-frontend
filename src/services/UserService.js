import axios from 'axios';

//  Base URL
const BASE_URL = 'http://localhost:8801/api/auth/';

//  Register route
const register = (username, email, password) => {
  return axios.post(BASE_URL + 'register', { username, email, password });
};

//  Login route
const login = (email, password) => {
  return axios.post(BASE_URL + 'login', { email, password });
};

//  Logout route
const logout = () => {
  return axios.post(BASE_URL + 'logout');
};

//  Reset password route
const resetPassword = async (authToken, newPassword) => {
  const response = axios.post(BASE_URL + `reset-password?token=${authToken}`, { newPassword: newPassword });
  return response.data;
};

//  Password reset email trigger
const sendPasswordResetEmail = async (email) => {
  return axios.post(BASE_URL + 'send-verification-email', { email });
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