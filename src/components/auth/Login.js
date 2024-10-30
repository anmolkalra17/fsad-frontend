import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './Login.css';
import UserService from '../../services/UserService';

//  Login component
const Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const navigate = useNavigate();
  const { loginHandler } = useContext(AuthContext);

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.login(userEmail, userPassword);
      loginHandler(response.data.token, response.data.id);
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert('Login failed: ' + error.response.data.message);
      } else {
        alert('Login failed: An unknown error occurred');
      }
    }
  };

  // Render the Login component
  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleFormSubmit}>
        <input
          type="email"
          className="login-input"
          placeholder="Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      <div className="login-links">
        Don't have an account? <Link to="/register">Register</Link>
      </div>
      <div className="login-links">
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default Login;