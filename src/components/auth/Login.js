// Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
	e.preventDefault();
	try {
	  const response = await axios.post('http://localhost:8801/api/auth/login', { email, password });
	  login(response.data.token);
	  navigate('/');
	} catch (error) {
	  console.error('Login failed:', error);
	  setError('Failed to log in. Please check your credentials and try again.');
	}
  };

  return (
	<div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      <div className="login-links">
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Login;