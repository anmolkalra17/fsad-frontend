import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookService from '../../services/BookService';
import './BookDetail.css';

const BookCondition = Object.freeze({
    BEST: 'Best',
    GOOD: 'Good',
    FAIR: 'Fair',
    BAD: 'Bad',
    TORN: 'Torn'
});

const BookAvailable = Object.freeze({
    YES: 'Yes',
    NO: 'No'
});

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [editedBook, setEditedBook] = useState({ available: true, condition: 'Good' });

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
        setIsEditing(true);
    };

    const handleCancel = () => {
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
        try {
            await BookService.deleteBook(id);
            alert('Book deleted successfully');
            navigate.push('/books');
        } catch (error) {
            alert('Failed to delete book');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedBook({ ...editedBook, [name]: value });
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
                        {Object.values(BookAvailable).map((available) => (
                            <div key={available}>
                                <input
                                    type="radio"
                                    id={available}
                                    name="available"
                                    value={available === 'Yes'}
                                    checked={editedBook.available ? available === 'Yes' : available === 'No'}
                                    onChange={handleChange}
                                />
                                <label htmlFor={available}>{available}</label>
                            </div>
                        ))}
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