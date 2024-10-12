// Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Add state for error message
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
	e.preventDefault();
	try {
	  const response = await axios.post('http://localhost:8801/api/auth/login', { email, password });
	  login(response.data.token); // Call login function from context
	  navigate('/'); // Redirect to home page
	} catch (error) {
	  console.error('Login failed:', error);
	  setError('Failed to log in. Please check your credentials and try again.'); // Set error message
	}
  };

  return (
	<div>
	  <h2>Login</h2>
	  {error && <div className="alert alert-danger">{error}</div>} {/* Display alert if error exists */}
	  <form onSubmit={handleSubmit}>
		<div>
		  <label>Email</label>
		  <input
			type="email"
			value={email}
			onChange={(e) => setEmail(e.target.value)}
			required
		  />
		</div>
		<div>
		  <label>Password</label>
		  <input
			type="password"
			value={password}
			onChange={(e) => setPassword(e.target.value)}
			required
		  />
		</div>
		<button type="submit">Login</button>
	  </form>
	</div>
  );
};

export default Login;