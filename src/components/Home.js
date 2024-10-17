import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './auth/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
	if (isAuthenticated) {
	  fetch('http://localhost:8801/api/books/')
		.then(response => response.json())
		.then(data => setBooks(data))
		.catch(error => console.error('Error fetching books:', error));
	  
	  navigate('/books');
	}
  }, [isAuthenticated, navigate]);

  return (
	<div className="home-container">
	  <h1 className="home-title">Welcome to Page Pilot</h1>
	  <h2 className="home-title-body">
		Page Pilot is a dynamic library management system that simplifies the organization of books and resources. Its user-friendly interface allows for efficient cataloging and tracking, making it easy to oversee collections and engage patrons. With advanced search capabilities, Page Pilot enhances the overall library experience for users.
	  </h2>
	  {isAuthenticated ? (
		<>
		  <button className="home-button" onClick={logout}>Logout</button>
		  <div className="books-list">
			<h2>Books List</h2>
			<ul>
			  {books.map(book => (
				<li key={book.id}>{book.title}</li>
			  ))}
			</ul>
		  </div>
		</>
	  ) : (
		<div className="home-links">
		  Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to continue.
		</div>
	  )}
	</div>
  );
};

export default Home;