import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import SearchComponent from '../search/SearchComponent';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login, token } = useContext(AuthContext);

  const handleSubmit = async (e) => {
	e.preventDefault();
	try {
	  const response = await axios.post('http://localhost:8801/api/auth/register', { username, email, password });
	  login(response.data.token); // Call login function from context
	  navigate('/'); // Redirect to home page
	} catch (error) {
	  console.error('Registration failed:', error);
	  setError('Failed to register. Please check your details and try again.');
	}
  };

  return (
	<div>
	  <h2>Register</h2>
	  {error && <div className="alert alert-danger">{error}</div>}
	  <form onSubmit={handleSubmit}>
		<div>
		  <label>Username</label>
		  <input
			type="text"
			value={username}
			onChange={(e) => setUsername(e.target.value)}
			required
		  />
		</div>
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
		<button type="submit">Register</button>
	  </form>
	  {token && <SearchComponent />} {/* Conditionally render the search component */}
	</div>
  );
};

export default Register;