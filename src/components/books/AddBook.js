import React, { useState } from 'react';
import BookService from '../../services/BookService';
import './AddBook.css';

const BookCondition = Object.freeze({
    BEST: 'Best',
    GOOD: 'Good',
    FAIR: 'Fair',
    BAD: 'Bad',
    TORN: 'Torn'
});

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [condition, setCondition] = useState('');
    const [availability, setAvailability] = useState(false);

    const handleAddBook = async (e) => {
        e.preventDefault();
        try {
            await BookService.addBook({ title, author, genre, condition, availability });
            alert('Book added successfully');
            window.location.href = '/books';
        } catch (error) {
            alert('Failed to add book');
        }
    };

    return (
        <div className="addbook-container">
            <h2 className="addbook-title">Add New Book</h2>
            <form className="addbook-form" onSubmit={handleAddBook}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <label htmlFor="author">Author</label>
                <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
                <label htmlFor="genre">Genre</label>
                <input
                    type="text"
                    id="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
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
                            onChange={() => setCondition(condition)}
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
                        checked={availability === true}
                        onChange={() => setAvailability(true)}
                    />
                    <label>Yes</label>
                    
                    <input
                        type="radio"
                        id="available-no"
                        name="available"
                        value={false}
                        checked={availability === false}
                        onChange={() => setAvailability(false)}
                    />
                    <label>No</label>
                </div>
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default AddBook;