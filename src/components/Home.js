import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './auth/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
	<div className="home-container">
	  <h1 className="home-title">Welcome to Page Pilot</h1>
	  <h2 className="home-title-body">Page Pilot is a dynamic library management system that simplifies the organization of books and resources. Its user-friendly interface allows for efficient cataloging and tracking, making it easy to oversee collections and engage patrons. With advanced search capabilities, Page Pilot enhances the overall library experience for users.</h2>
	  {isAuthenticated ? (
		<button className="home-button" onClick={logout}>Logout</button>
	  ) : (
		<div className="home-links">
		  Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to continue.
		</div>
	  )}
	</div>
  );
};

export default Home;