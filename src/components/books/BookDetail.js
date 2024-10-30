import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookService from '../../services/BookService';
import './BookDetail.css';

import placeholderImg from '../../assets/placeholder.png';
import TransactionService from '../../services/TransactionService';

// BookCondition object
const BookCondition = Object.freeze({
    BEST: 'Best',
    GOOD: 'Good',
    FAIR: 'Fair',
    BAD: 'Bad',
    TORN: 'Torn'
});

// BookDetail component
const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    const currentUser = localStorage.getItem('userId') ?? ''

    const [isOwner, setIsOwner] = useState(false);

    const [isEditingBook, setIsEditingBook] = useState(false);
    const [editedBook, setEditedBook] = useState({
        available: false,
        condition: ''
    });
    const [coverUrl, setCoverUrl] = useState('');

    // Fetch book details
    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await BookService.getBookById(id);
                setBook(response.data);
                setEditedBook(response.data);
                setCoverUrl(response.data.thumbnail);
                setIsOwner(response.data.user === currentUser);
            } catch (error) {
                alert('Failed to fetch book details');
            }
        };

        fetchBookData();
    }, [id, currentUser]);

    // Update book handler
    const handleBookUpdate = () => {
        editedBook.available = book.available;
        setIsEditingBook(true);
    };

    // Cancel edit handler
    const handleBookUpdateCancel = () => {
        setEditedBook(book);
        setIsEditingBook(false);
    };

    // Save book handler
    const handleBookUpdateSave = async () => {
        try {
            await BookService.editBook(id, editedBook);
            setBook(editedBook);
            setIsEditingBook(false);
            alert('Book updated successfully');
        } catch {
            alert('Failed to update book');
        }
    };

    // Delete book handler
    const handleBookDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this book?');
        if (confirmed) {
            try {
                await BookService.deleteBook(id);
                alert('Book deleted successfully');
                window.location.href = '/books';
            } catch (error) {
                alert('Failed to delete book');
            }
        }
    };

    // Book data change handler
    const handleBookDataChange = (e) => {
        const { name, value } = e.target;
        setEditedBook({ ...editedBook, [name]: name === 'available' ? value === 'true' : value });
    };

    // Borrow book handler
    const handleBookBorrow = async () => {
        const currentUserId = localStorage.getItem('userId');
        const borrow = window.confirm('Are you sure you want to borrow this book?');
        if (borrow) {
            try {
                await TransactionService.createTransaction(currentUserId, book._id, book.user);
                alert('Borrow request sent successfully');
            } catch (error) {
                alert('Failed to send borrow request');
            }
        }
    };

    if (!book) {
        return <div>Loading...</div>;
    }

    // Render the BookDetail component
    return (
        <div className="bookdetail-container">
            {isEditingBook ? (
                <>
                    <form>
                        <p>Please select the book condition:</p>
                        {Object.values(BookCondition).map((condition) => (
                            <div key={condition}>
                                <input
                                    type="radio"
                                    id={condition}
                                    name="condition"
                                    value={condition}
                                    checked={editedBook.condition === condition}
                                    onChange={handleBookDataChange}
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
                                checked={editedBook.available === true}
                                onChange={handleBookDataChange}
                            />
                            <label htmlFor="available-yes">Yes</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="available-no"
                                name="available"
                                value={false}
                                checked={editedBook.available === false}
                                onChange={handleBookDataChange}
                            />
                            <label htmlFor="available-no">No</label>
                        </div>
                        <button className="bookdetail-button" onClick={handleBookUpdateSave}>Save</button>
                        <button className="bookcancel-button" onClick={handleBookUpdateCancel}>Cancel</button>
                    </form>
                </>
            ) : (
                <>
                    <div className='book-detail'>
                        <h1 className="bookdetail-title">{book.title}</h1>
                        <p className="bookdetail-author">{book.author}</p>
                        <p className="bookdetail-description"> Genre: {book.genre}</p>
                        <p className="bookdetail-description"> Book Condition: {book.condition}</p>
                        <p className="bookdetail-description"> Available: {book.available ? "Yes" : "No"}</p>

                        {isOwner ? (
                            <div>
                                <button className="bookupdate-button" onClick={handleBookUpdate}>Update Book</button>
                                <button className="bookdelete-button" onClick={handleBookDelete}>Delete Book</button>
                            </div>
                        ) : (
                            <div>
                                <button className="bookborrow-button" onClick={handleBookBorrow} disabled={!book.available}>Borrow Book</button>
                            </div>
                        )}
                    </div>
                    <div className="book-cover">
                        {coverUrl ? (
                            <img src={coverUrl} alt={`${book.title} cover`} />
                        ) : (
                            <img src={placeholderImg} alt='placeholder' width="200" height="200" />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default BookDetail;