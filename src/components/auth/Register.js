import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import UserService from '../../services/UserService';
import SearchComponent from '../search/SearchComponent';
import './Register.css';

// Register component
const Register = () => {
	const [username, setUsername] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');

	const navigate = useNavigate();

	const { loginHandler, authToken } = useContext(AuthContext);

	// Handle form submission
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await UserService.register(username, userEmail, userPassword);
			loginHandler(response.data.token);
			navigate('/');
		} catch (error) {
			console.error('Registration failed:', error);
			alert('Failed to register. Please check your details and try again.');
		}
	};

	// Render the Register component
	return (
		<div className="register-container">
			<h1 className="register-title">Register</h1>
			<form className="register-form" onSubmit={handleFormSubmit}>
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
					value={userEmail}
					onChange={(e) => setUserEmail(e.target.value)}
				/>
				<input
					type="password"
					className="register-input"
					placeholder="Password"
					value={userPassword}
					onChange={(e) => setUserPassword(e.target.value)}
				/>
				<button type="submit" className="register-button">Register</button>
			</form>
			<div className="login-links">
				Already have an account? <Link to="/login">Login</Link>
			</div>
			{authToken && <SearchComponent />} {/* Conditionally render the search component */}
		</div>
	);
};

export default Register;