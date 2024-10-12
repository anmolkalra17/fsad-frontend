import React, { useEffect, useState } from 'react';
import BookService from '../../services/BookService';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
	const fetchBooks = async () => {
	  try {
		const response = await BookService.getBooks();
		setBooks(response.data);
	  } catch (error) {
		alert('Failed to fetch books');
	  }
	};

	fetchBooks();
  }, []);

  return (
	<div>
	  <h2>My Books</h2>
	  <ul>
		{books.map((book) => (
		  <li key={book.id}>
			{book.title} by {book.author}
		  </li>
		))}
	  </ul>
	</div>
  );
};

export default BookList;