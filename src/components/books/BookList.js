import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';
import './BookList.css';

const BookList = () => {
  const { logout } = useContext(AuthContext);
  const [books, setBooks] = useState([]);

  useEffect(() => {
	fetch('http://localhost:8801/api/books/')
	  .then(response => response.json())
	  .then(data => setBooks(data))
	  .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
	<div className="booklist-container">
	  <h1 className="booklist-title">Books List</h1>
	  <button className="logout-button" onClick={logout}>Logout</button>
	  <ul className="booklist">
		{books.map(book => (
		  <li key={book.id} className="booklist-item">{book.title}</li>
		))}
	  </ul>
	</div>
  );
};

export default BookList;