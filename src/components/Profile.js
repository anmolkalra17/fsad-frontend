import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';
import BookService from '../services/BookService';
import './Profile.css';

import profilePlaceholderImg from '../assets/profile-placeholder.jpg';
import viewIcon from '../assets/view.png';
import deleteIcon from '../assets/delete.png';
import checkmarkIcon from '../assets/check.png';
import removeIcon from '../assets/remove.png';
import TransactionService from '../services/TransactionService';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: '', email: '' });
    const [books, setBooks] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [borrowRequests, setBorrowRequests] = useState([]);

    const [showAllBooks, setShowAllBooks] = useState(false);
    const [showAllTransactions, setShowAllTransactions] = useState(false);
    const [showAllBorrowRequests, setShowAllBorrowRequests] = useState(false);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await UserService.getUserProfile(userId);

                const { username, email } = response.data.user;
                setUser({ username, email });

                const { books } = response.data;
                setBooks(books);

            } catch (error) {
                console.log('Failed to fetch user details');
                console.log(error);
            }
        };

        const fetchBorrowRequests = async () => {
            try {
                const response = await TransactionService.getBorrowRequests();
                setBorrowRequests(response.data);
            } catch (error) {
                console.log('Failed to fetch borrow requests');
                console.log(error);
            }
        };

        const fetchTransactions = async () => {
            try {
                const response = await TransactionService.getTransactions();
                setTransactions(response.data);
            } catch (error) {
                console.log('Failed to fetch borrow requests');
                console.log(error);
            }
        };

        fetchUser();
        fetchBorrowRequests();
        fetchTransactions();
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

    const toggleShowAllBorrowRequests = () => {
        setShowAllBorrowRequests(!showAllBorrowRequests);
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

    const handleAcceptRequest = async (transactionId) => {
        const confirmed = window.confirm('Are you sure you want to accept this request?');

        if (confirmed) {
            try {
                await TransactionService.updateTransaction(transactionId, 'accepted');
                window.location.href = '/profile';
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const handleRejectRequest = async (transactionId) => {
        const confirmed = window.confirm('Are you sure you want to decline this request?');

        if (confirmed) {
            try {
                await TransactionService.updateTransaction(transactionId, 'canceled');
                window.location.href = '/profile';
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
    
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
    
        return `${hours}:${minutes}, ${day}/${month}/${year}`;
    }

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
                                <button onClick={() => handleView(book.uuid)}>
                                    <img src={viewIcon} alt="View" />
                                </button>
                                <button onClick={() => handleDeleteBook(book.uuid)}>
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

            <h2 className="transactions-header">Sent Borrow Requests</h2>
            <div className="grid-container">
                {transactions && transactions.length > 0 ? (
                    transactions.slice(0, showAllTransactions ? transactions.length : 3).map((transaction) => (
                        <div key={transaction.uuid} className="grid-item">
                            <div className="card-buttons">
                                <button onClick={() => handleView(transaction.bookId)}>
                                    <img src={viewIcon} alt="View" />
                                </button>
                                {transaction.status !== 'pending' ? (
                                    console.log('Transaction is not pending')
                                ) : (
                                    <button onClick={() => handleDeleteTransaction(transaction._id)}>
                                        <img src={deleteIcon} alt="Delete" />
                                    </button>
                                )}
                            </div>
                            <p><strong>Book Name:</strong> {transaction.bookId.title}</p>
                            <p><strong>Status:</strong> {transaction.status}</p>
                            <p><strong>Date Requested:</strong> {formatTimestamp(new Date(transaction.createdAt))}</p>
                            <p><strong>Last Updated:</strong> {formatTimestamp(new Date(transaction.updatedAt))}</p>
                        </div>
                    ))
                ) : (
                    <p>No requests sent</p>
                )}
            </div>
            {transactions && transactions.length > 3 && (
                <button onClick={toggleShowAllTransactions} className="toggle-button">
                    {showAllTransactions ? 'Show Less' : 'Show More'}
                </button>
            )}
            <h2 className="borrow-requests-header">Received Borrow Requests</h2>
            <div className="grid-container">
                {borrowRequests && borrowRequests.length > 0 ? (
                    borrowRequests.slice(0, showAllBorrowRequests ? borrowRequests.length : 3).map((borrowRequest) => (
                        <div key={borrowRequest._id} className="grid-item">
                            <div className="card-buttons">
                                <button onClick={() => handleView(borrowRequest.bookId._id)}>
                                    <img src={viewIcon} alt="View" />
                                </button>
                                {borrowRequest.status === 'pending' ? (
                                    <div>
                                        <button onClick={() => handleAcceptRequest(borrowRequest._id)}>
                                            <img src={checkmarkIcon} alt="Accept" />
                                        </button>
                                        <button onClick={() => handleRejectRequest(borrowRequest._id)}>
                                            <img src={removeIcon} alt="Decline" />
                                        </button>
                                    </div>
                                ) : (
                                    console.log('Transaction is not pending')
                                )}
                            </div>
                            <p><strong>Book Name:</strong> {borrowRequest.bookId.title}</p>
                            <p><strong>Status:</strong> {borrowRequest.status}</p>
                            <p><strong>Created At:</strong> {formatTimestamp(new Date(borrowRequest.createdAt))}</p>
                        </div>
                    ))
                ) : (
                    <p>No requests received</p>
                )}
            </div>
            {borrowRequests && borrowRequests.length > 3 && (
                <button onClick={toggleShowAllBorrowRequests} className="toggle-button">
                    {showAllBorrowRequests ? 'Show Less' : 'Show More'}
                </button>
            )}
        </div>
    );
};

export default Profile;