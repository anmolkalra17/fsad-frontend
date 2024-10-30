import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookService from '../../services/BookService';

// EditBook component
const EditBook = () => {
	const { id } = useParams();
	const [book, setBook] = useState({
		title: '',
		author: '',
		genre: '',
		condition: '',
		availability: true,
	});

	// Fetch book details
	useEffect(() => {
		const fetchBookData = async () => {
			try {
				const response = await BookService.getBookById(id);
				setBook(response.data);
			} catch (error) {
				alert('Failed to fetch book details');
			}
		};

		fetchBookData();
	}, [id]);

	// Handle edit book
	const handleEditBookClick = async (e) => {
		e.preventDefault();
		try {
			await BookService.editBook(id, book);
			alert('Book updated successfully');
		} catch (error) {
			alert('Failed to update book');
		}
	};

	// Render the EditBook component
	return (
		<form onSubmit={handleEditBookClick}>
			<input type="text" value={book.title} onChange={(e) => setBook({ ...book, title: e.target.value })} placeholder="Title" required />
			<input type="text" value={book.author} onChange={(e) => setBook({ ...book, author: e.target.value })} placeholder="Author" required />
			<input type="text" value={book.genre} onChange={(e) => setBook({ ...book, genre: e.target.value })} placeholder="Genre" required />
			<input type="text" value={book.condition} onChange={(e) => setBook({ ...book, condition: e.target.value })} placeholder="Condition" required />
			<label>
				Available:
				<input type="checkbox" checked={book.availability} onChange={(e) => setBook({ ...book, availability: e.target.checked })} />
			</label>
			<button type="submit">Update Book</button>
		</form>
	);
};

export default EditBook;