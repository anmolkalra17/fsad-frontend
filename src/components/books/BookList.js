import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import './BookList.css';

const BookList = () => {
	const { logout } = useContext(AuthContext);
	const [books, setBooks] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		fetch('http://localhost:8801/api/books/')
			.then(response => response.json())
			.then(data => setBooks(data))
			.catch(error => console.error('Error fetching books:', error));
	}, []);

	const filteredBooks = books.filter(book =>
		book.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleBookClick = (uuid) => {
		navigate(`/book/${uuid}`);
	};

	const handleAddBook = () => {
		navigate('/add-book');
	};

	return (
		<div className="booklist-container">
			<div className="button-container">
				<button className="addbook-button" onClick={handleAddBook}>Add Book</button>
				<button className="logout-button" onClick={logout}>Logout</button>
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