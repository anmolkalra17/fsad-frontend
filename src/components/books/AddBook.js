import React, { useState } from 'react';
import BookService from '../../services/BookService';
import './AddBook.css';

// BookCondition object
const BookCondition = Object.freeze({
    BEST: 'Best',
    GOOD: 'Good',
    FAIR: 'Fair',
    BAD: 'Bad',
    TORN: 'Torn'
});

// AddBook component
const AddBook = () => {
    const [bookTitle, setBookTitle] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const [bookGenre, setBookGenre] = useState('');
    const [bookCondition, setBookCondition] = useState('');
    const [bookAvailability, setBookAvailability] = useState(false);

    // Handle add book
    const handleBookAddition = async (e) => {
        e.preventDefault();
        try {
            await BookService.addBook({ title: bookTitle, author: bookAuthor, genre: bookGenre, condition: bookCondition, available: bookAvailability });
            alert('Book added successfully');
            window.location.href = '/books';
        } catch (error) {
            alert('Failed to add book');
        }
    };

    // Render the AddBook component
    return (
        <div className="addbook-container">
            <h2 className="addbook-title">Add New Book</h2>
            <form className="addbook-form" onSubmit={handleBookAddition}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                    required
                />
                <label htmlFor="author">Author</label>
                <input
                    type="text"
                    id="author"
                    value={bookAuthor}
                    onChange={(e) => setBookAuthor(e.target.value)}
                    required
                />
                <label htmlFor="genre">Genre</label>
                <input
                    type="text"
                    id="genre"
                    value={bookGenre}
                    onChange={(e) => setBookGenre(e.target.value)}
                    required
                />

                <p>Please select the book condition:</p>
                {Object.values(BookCondition).map((condition) => (
                    <div key={condition}>
                        <input
                            required
                            type="radio"
                            id={condition}
                            name="condition"
                            onChange={() => setBookCondition(condition)}
                        />
                        <label htmlFor={condition}>{condition}</label>
                    </div>
                ))}

                <p>Is the book available?</p>
                <div>

                    <input
                        type="radio"
                        id="available-yes"
                        name="available"
                        value={true}
                        checked={bookAvailability === true}
                        onChange={() => setBookAvailability(true)}
                    />
                    <label>Yes</label>

                    <input
                        type="radio"
                        id="available-no"
                        name="available"
                        value={false}
                        checked={bookAvailability === false}
                        onChange={() => setBookAvailability(false)}
                    />
                    <label>No</label>
                </div>
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default AddBook;