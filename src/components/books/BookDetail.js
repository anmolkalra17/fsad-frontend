import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookService from '../../services/BookService';
import './BookDetail.css';

const BookCondition = Object.freeze({
    BEST: 'Best',
    GOOD: 'Good',
    FAIR: 'Fair',
    BAD: 'Bad',
    TORN: 'Torn'
});


const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [editedBook, setEditedBook] = useState({
        available: false,
        condition: ''
    });

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await BookService.getBookById(id);
                setBook(response.data);
                setEditedBook(response.data);
                console.log('Book available:', response.data.available);
            } catch (error) {
                alert('Failed to fetch book details');
            }
        };

        fetchBook();
    }, [id]);

    const handleUpdate = () => {
        editedBook.available = book.available;
        setIsEditing(true);
    };

    const handleCancel = () => {
        setEditedBook(book);
        setIsEditing(false);
    };

    const handleSave = async () => {
        try {
            await BookService.editBook(id, editedBook);
            setBook(editedBook);
            setIsEditing(false);
            alert('Book updated successfully');
        } catch {
            alert('Failed to update book');
        }
    };

    const handleDelete = async () => {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedBook({ ...editedBook, [name]: name === 'available' ? value === 'true' : value });
    };

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bookdetail-container">
            {isEditing ? (
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
                                    onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
                            />
                            <label htmlFor="available-no">No</label>
                        </div>
                    </form>

                    <button className="bookdetail-button" onClick={handleSave}>Save</button>
                    <button className="bookcancel-button" onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <>
                    <h1 className="bookdetail-title">{book.title}</h1>
                    <p className="bookdetail-author">{book.author}</p>
                    <p className="bookdetail-description"> Genre: {book.genre}</p>
                    <p className="bookdetail-description"> Book Condition: {book.condition}</p>
                    <p className="bookdetail-description"> Available: {book.available ? "Yes" : "No"}</p>
                    <button className="bookupdate-button" onClick={handleUpdate}>Update Book</button>
                    <button className="bookdelete-button" onClick={handleDelete}>Delete Book</button>
                </>
            )}
        </div>
    );
};

export default BookDetail;