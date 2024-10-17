import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/AuthContext'; // Adjust the import path as needed
import './BookList.css';

const BookList = () => {
  const { logout } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
	fetch('http://localhost:8801/api/books/')
	  .then(response => response.json())
	  .then(data => setBooks(data))
	  .catch(error => console.error('Error fetching books:', error));
  }, []);

  const filteredBooks = books.filter(book =>
	book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
	<div className="booklist-container">
	  <h1 className="booklist-title">Books List</h1>
	  <button className="logout-button" onClick={logout}>Logout</button>
	  <input
		type="text"
		className="search-bar"
		placeholder="Search books..."
		value={searchQuery}
		onChange={(e) => setSearchQuery(e.target.value)}
	  />
	  <ul className="booklist">
		{filteredBooks.map(book => (
		  <li key={book.id} className="booklist-item">{book.title}</li>
		))}
	  </ul>
	</div>
  );
};

export default BookList;