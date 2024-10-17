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
		console.log("Clicked on book id: ", uuid);
		navigate(`/book/${uuid}`);
	};

	return (
		<div className="booklist-container">
			<button className="logout-button" onClick={logout}>Logout</button>
			<h1 className="booklist-title">Books List</h1>
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