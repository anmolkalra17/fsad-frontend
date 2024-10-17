import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookService from '../../services/BookService';
import './BookDetail.css';

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await BookService.getBookById(id);
                setBook(response.data);
            } catch (error) {
                alert('Failed to fetch book details');
            }
        };

        fetchBook();
    }, [id]);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bookdetail-container">
            <h1 className="bookdetail-title">{book.title}</h1>
            <div className="bookdetail-item">
                <p>Author: {book.author}</p>
                <p>Genre: {book.genre}</p>
                <p>Condition: {book.condition}</p>
                <p>Availability: {book.availability ? 'Available' : 'Not Available'}</p>
            </div>
        </div>
    );
};

export default BookDetail;