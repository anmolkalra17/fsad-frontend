import React, { useState } from 'react';
import BookService from '../../services/BookService';

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [condition, setCondition] = useState('');
    const [availability, setAvailability] = useState(true);

    const handleAddBook = async (e) => {
        e.preventDefault();
        try {
            await BookService.addBook({ title, author, genre, condition, availability });
            alert('Book added successfully');
        } catch (error) {
            alert('Failed to add book');
        }
    };

    return (
        <form onSubmit={handleAddBook}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" required />
            <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" required />
            <input type="text" value={condition} onChange={(e) => setCondition(e.target.value)} placeholder="Condition" required />
            <label>
                Available:
                <input type="checkbox" checked={availability} onChange={(e) => setAvailability(e.target.checked)} />
            </label>
            <button type="submit">Add Book</button>
        </form>
    );
};

export default AddBook;