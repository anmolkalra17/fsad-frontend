// Home.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './auth/AuthContext';

const Home = () => {
	const { isAuthenticated, logout } = useContext(AuthContext);

	return (
		<div>
			<h1>Welcome to the Book Management App</h1>
			{isAuthenticated ? (
				<button onClick={logout}>Logout</button>
			) : (
				<p>
					Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to continue.
				</p>
			)}
		</div>
	);
};

export default Home;