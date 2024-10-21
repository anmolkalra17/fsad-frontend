import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';
import BookService from '../services/BookService';
import './Profile.css';

import profilePlaceholderImg from '../assets/profile-placeholder.jpg';
import viewIcon from '../assets/view.png';
import deleteIcon from '../assets/delete.png';
import TransactionService from '../services/TransactionService';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: '', email: '' });
    const [books, setBooks] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const [showAllBooks, setShowAllBooks] = useState(false);
    const [showAllTransactions, setShowAllTransactions] = useState(false);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await UserService.getUserProfile(userId);

                const { username, email } = response.data.user;
                setUser({ username, email });

                const { books } = response.data;
                setBooks(books);

                const { transactions } = response.data;
                setTransactions(transactions);
            } catch (error) {
                alert('Failed to fetch user details');
                console.log(error);
            }
        };

        fetchUser();
    }, [userId]);

    const logout = () => {
        sessionStorage.clear();
        window.history.replaceState(null, null, window.location.href);
        window.location.href = '/login';
    };

    const toggleShowAllBooks = () => {
        setShowAllBooks(!showAllBooks);
    };

    const toggleShowAllTransactions = () => {
        setShowAllTransactions(!showAllTransactions);
    };

    const handleView = (bookId) => {
        navigate(`/book/${bookId}`);
    };

    const handleDeleteBook = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this book?');
        if (confirmed) {
            try {
                await BookService.deleteBook(id);
                alert('Book deleted successfully');
                window.location.href = '/profile';
            } catch (error) {
                alert('Failed to delete book');
            }
        }
    };

    const handleDeleteTransaction = async (bookId) => {
        const confirmed = window.confirm('Are you sure you want to cancel this transaction?');

        if (confirmed) {
            try {
                const response = await TransactionService.cancelTransaction(bookId);
                window.location.href = '/profile';
                if (response.ok) {
                    setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
                } else {
                    console.error('Failed to cancel the transaction');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="profile-container">
            <div className='logout-container'>
                <button onClick={logout} className="logout-profile-button">Logout</button>
            </div>

            <div className='profile-details'>
                <h1 className="profile-header">Hello, {user.username ?? 'Username'}</h1>
                <img src={profilePlaceholderImg} alt='profile-placeholder' className='profile-picture'></img>
                <p className="profile-email">{user.email ?? 'Email'}</p>
            </div>

            <h2 className="books-header">Your Books</h2>
            <div className="grid-container">
                {books && books.length > 0 ? (
                    books.slice(0, showAllBooks ? books.length : 3).map((book) => (
                        <div key={book.uuid} className="grid-item">
                            <div className="card-buttons">
                                <button className="view-button" onClick={() => handleView(book.uuid)}>
                                    <img src={viewIcon} alt="View" />
                                </button>
                                <button className="delete-button" onClick={() => handleDeleteBook(book.uuid)}>
                                    <img src={deleteIcon} alt="Delete" />
                                </button>
                            </div>
                            <p><strong>Title:</strong> {book.title}</p>
                            <p><strong>Author:</strong> {book.author}</p>
                            <p><strong>Genre:</strong> {book.genre}</p>
                            <p><strong>Condition:</strong> {book.condition}</p>
                            <p><strong>Available:</strong> {book.available ? 'Yes' : 'No'}</p>
                        </div>
                    ))
                ) : (
                    <p>No books available</p>
                )}
            </div>
            {books && books.length > 3 && (
                <button onClick={toggleShowAllBooks} className="toggle-button">
                    {showAllBooks ? 'Show Less' : 'Show More'}
                </button>
            )}

            <h2 className="transactions-header">Your Transactions</h2>
            <div className="grid-container">
                {transactions && transactions.length > 0 ? (
                    transactions.slice(0, showAllTransactions ? transactions.length : 3).map((transaction) => (
                        <div key={transaction.uuid} className="grid-item">
                            <div className="card-buttons">
                                <button className="view-button" onClick={() => handleView(transaction.bookId)}>
                                    <img src={viewIcon} alt="View" />
                                </button>
                                { transaction.status !== 'pending' ? (
                                    console.log('Transaction is not pending')
                                ) : (
                                    <button className="delete-button" onClick={ () => handleDeleteTransaction(transaction._id)}>
                                        <img src={deleteIcon} alt="Delete" />
                                    </button>
                                )}
                            </div>
                            <p><strong>Transaction ID:</strong> {transaction._id}</p>
                            <p><strong>Date:</strong> {new Date(transaction.createdAt).toDateString()}</p>
                            <p><strong>Last Updated:</strong> {new Date(transaction.updatedAt).toDateString()}</p>
                            <p><strong>Status:</strong> {transaction.status}</p>
                        </div>
                    ))
                ) : (
                    <p>No transactions available</p>
                )}
            </div>
            {transactions && transactions.length > 3 && (
                <button onClick={toggleShowAllTransactions} className="toggle-button">
                    {showAllTransactions ? 'Show Less' : 'Show More'}
                </button>
            )}
        </div>
    );
};

export default Profile;