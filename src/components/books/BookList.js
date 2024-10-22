import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import './BookList.css';

// BookList component
const BookList = () => {
	const { logout } = useContext(AuthContext);
	const [books, setBooks] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const navigate = useNavigate();

	// Fetch books when component mounts
	useEffect(() => {
		fetch('http://localhost:8801/api/books/')
			.then(response => response.json())
			.then(data => setBooks(data))
			.catch(error => console.error('Error fetching books:', error));
	}, []);

	// Filter books based on search query
	const filteredBooks = books.filter(book =>
		book.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Navigate to book details
	const handleBookClick = (uuid) => {
		navigate(`/book/${uuid}`);
	};

	// Add Book handler function
	const handleAddBook = () => {
		navigate('/add-book');
	};

	//	Profile handler function
	const handleProfile = () => {
		navigate('/profile');
	};

	// Render the BookList component
	return (
		<div className="booklist-container">
			<div className="button-container">
				<button className="addbook-button" onClick={handleAddBook}>Add Book</button>
				<div>
					<button className="profile-button" onClick={handleProfile}>Profile</button>
					<button className="logout-button" onClick={logout}>Logout</button>
				</div>
			</div>
			<h1 className="booklist-title">Books</h1>
			<input
				type="text"
				className="search-bar"
				placeholder="Search books..."
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
			<ul className="booklist">
				{(filteredBooks.length > 0 ? filteredBooks : books).map(book => (
					<li
						key={book.uuid}
						className="booklist-item"
						onClick={() => handleBookClick(book.uuid)}
					>
						{book.title}
					</li>
				))}
			</ul>
		</div>
	);
};

export default BookList;