import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import SearchComponent from '../search/SearchComponent';
import './Register.css';

// Register component
const Register = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const { login, token } = useContext(AuthContext);

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:8801/api/auth/register', { username, email, password });
			login(response.data.token);
			navigate('/');
		} catch (error) {
			console.error('Registration failed:', error);
			setError('Failed to register. Please check your details and try again.');
		}
	};

	// Render the Register component
	return (
		<div className="register-container">
			<h1 className="register-title">Register</h1>
			{error && <div className="alert alert-danger">{error}</div>}
			<form className="register-form" onSubmit={handleSubmit}>
				<input type="text"
					className="register-input"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="email"
					className="register-input"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					className="register-input"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit" className="register-button">Register</button>
			</form>
			<div className="login-links">
				Already have an account? <Link to="/login">Login</Link>
			</div>
			{token && <SearchComponent />} {/* Conditionally render the search component */}
		</div>
	);
};

export default Register;