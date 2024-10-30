import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import './BookList.css';
import BookService from '../../services/BookService';

// BookList component
const BookList = () => {
	const { logoutHandler } = useContext(AuthContext);
	const [books, setBooks] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const navigate = useNavigate();

	// Fetch books when component mounts
	useEffect(() => {

		const getBookData = async () => {
			try {
				const response = await BookService.getBooks();
				setBooks(response.data);
			} catch (error) {
				alert('Failed to fetch books');
			}
		}

		getBookData();
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
	const handleAddBookClick = () => {
		navigate('/add-book');
	};

	//	Profile handler function
	const handleUserProfileClick = () => {
		navigate('/profile');
	};

	// Render the BookList component
	return (
		<div className="booklist-container">
			<div className="button-container">
				<button className="addbook-button" onClick={handleAddBookClick}>Add Book</button>
				<div>
					<button className="profile-button" onClick={handleUserProfileClick}>Profile</button>
					<button className="logout-button" onClick={logoutHandler}>Logout</button>
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