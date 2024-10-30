import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';
import BookService from '../services/BookService';
import TransactionService from '../services/TransactionService';
import './Profile.css';

//  Image assets imports
import profilePlaceholderImg from '../assets/profile-placeholder.jpg';
import viewIcon from '../assets/view.png';
import deleteIcon from '../assets/delete.png';
import checkmarkIcon from '../assets/check.png';
import removeIcon from '../assets/remove.png';

//  Profile component
const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ username: '', email: '' });
    const [booksData, setBooksData] = useState([]);
    const [transactionsData, setTransactionsData] = useState([]);
    const [borrowRequestsData, setBorrowRequestsData] = useState([]);

    const [showAllBooksToggle, setShowAllBooksToggle] = useState(false);
    const [showAllTransactionsToggle, setShowAllTransactionsToggle] = useState(false);
    const [showAllBorrowRequestsToggle, setShowAllBorrowRequestsToggle] = useState(false);

    const userId = localStorage.getItem('userId');

    //  Fetch user, books and transactions data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await UserService.getUserProfile(userId);

                const { username, email } = response.data.user;
                setUserData({ username, email });

                const { books } = response.data;
                setBooksData(books);

            } catch (error) {
                console.log('Failed to fetch user details');
                console.log(error);
            }
        };

        const fetchBorrowRequestsData = async () => {
            try {
                const response = await TransactionService.getBorrowRequests();
                setBorrowRequestsData(response.data);
            } catch (error) {
                console.log('Failed to fetch borrow requests');
                console.log(error);
            }
        };

        const fetchTransactionsData = async () => {
            try {
                const response = await TransactionService.getTransactions();
                setTransactionsData(response.data);
            } catch (error) {
                console.log('Failed to fetch borrow requests');
                console.log(error);
            }
        };

        fetchUserData();
        fetchBorrowRequestsData();
        fetchTransactionsData();
    }, [userId]);

    //  Logout handler function
    const logoutUser = () => {
        sessionStorage.clear();
        window.history.replaceState(null, null, window.location.href);
        window.location.href = '/login';
    };

    //  Toggle show all books
    const toggleShowAllBooks = () => {
        setShowAllBooksToggle(!showAllBooksToggle);
    };

    //  Toggle show all transactions
    const toggleShowAllTransactions = () => {
        setShowAllTransactionsToggle(!showAllTransactionsToggle);
    };

    //  Toggle show all borrow requests
    const toggleShowAllBorrowRequests = () => {
        setShowAllBorrowRequestsToggle(!showAllBorrowRequestsToggle);
    };

    //  Handle view book
    const handleBookDetailView = (bookId) => {
        navigate(`/book/${bookId}`);
    };

    //  Handle delete book
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

    //  Handle delete transaction
    const handleDeleteTransaction = async (bookId) => {
        const confirmed = window.confirm('Are you sure you want to cancel this transaction?');

        if (confirmed) {
            try {
                const response = await TransactionService.cancelTransaction(bookId);
                window.location.href = '/profile';
                if (response.ok) {
                    setBooksData((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
                } else {
                    console.error('Failed to cancel the transaction');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    //  Handle transcation accept request
    const handleAcceptTransactionClick = async (transactionId) => {
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

    //  Handle transcation reject request
    const handleRejectTransactionClick = async (transactionId) => {
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

    //  Format timestamp
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${hours}:${minutes}, ${day}/${month}/${year}`;
    }

    //  Render Profile component
    return (
        <div className="profile-container">
            <div className='logout-container'>
                <button onClick={logoutUser} className="logout-profile-button">Logout</button>
            </div>

            <div className='profile-details'>
                <h1 className="profile-header">Hello, {userData.username ?? 'Username'}</h1>
                <img src={profilePlaceholderImg} alt='profile-placeholder' className='profile-picture'></img>
                <p className="profile-email">{userData.email ?? 'Email'}</p>
            </div>

            <h2 className="books-header">Your Books</h2>
            <div className="grid-container">
                {booksData && booksData.length > 0 ? (
                    booksData.slice(0, showAllBooksToggle ? booksData.length : 3).map((bookData) => (
                        <div key={bookData.uuid} className="grid-item">
                            <div className="card-buttons">
                                <button onClick={() => handleBookDetailView(bookData.uuid)}>
                                    <img src={viewIcon} alt="View" />
                                </button>
                                <button onClick={() => handleDeleteBook(bookData.uuid)}>
                                    <img src={deleteIcon} alt="Delete" />
                                </button>
                            </div>
                            <p><strong>Title:</strong> {bookData.title}</p>
                            <p><strong>Author:</strong> {bookData.author}</p>
                            <p><strong>Genre:</strong> {bookData.genre}</p>
                            <p><strong>Condition:</strong> {bookData.condition}</p>
                            <p><strong>Available:</strong> {bookData.available ? 'Yes' : 'No'}</p>
                        </div>
                    ))
                ) : (
                    <p>No books available</p>
                )}
            </div>
            {booksData && booksData.length > 3 && (
                <button onClick={toggleShowAllBooks} className="toggle-button">
                    {showAllBooksToggle ? 'Show Less' : 'Show More'}
                </button>
            )}

            <h2 className="transactions-header">Sent Borrow Requests</h2>
            <div className="grid-container">
                {transactionsData && transactionsData.length > 0 ? (
                    transactionsData.slice(0, showAllTransactionsToggle ? transactionsData.length : 3).map((transactionData) => (
                        <div key={transactionData.uuid} className="grid-item">
                            <div className="card-buttons">
                                <button onClick={() => handleBookDetailView(transactionData.bookId._id)}>
                                    <img src={viewIcon} alt="View" />
                                </button>
                                {transactionData.status !== 'pending' ? (
                                    console.log('Transaction is not pending')
                                ) : (
                                    <button onClick={() => handleDeleteTransaction(transactionData._id)}>
                                        <img src={deleteIcon} alt="Delete" />
                                    </button>
                                )}
                            </div>
                            <p><strong>Book Name:</strong> {transactionData.bookId.title}</p>
                            <p><strong>Status:</strong> {transactionData.status}</p>
                            <p><strong>Date Requested:</strong> {formatTimestamp(new Date(transactionData.createdAt))}</p>
                            <p><strong>Last Updated:</strong> {formatTimestamp(new Date(transactionData.updatedAt))}</p>
                        </div>
                    ))
                ) : (
                    <p>No requests sent</p>
                )}
            </div>
            {transactionsData && transactionsData.length > 3 && (
                <button onClick={toggleShowAllTransactions} className="toggle-button">
                    {showAllTransactionsToggle ? 'Show Less' : 'Show More'}
                </button>
            )}
            <h2 className="borrow-requests-header">Received Borrow Requests</h2>
            <div className="grid-container">
                {borrowRequestsData && borrowRequestsData.length > 0 ? (
                    borrowRequestsData.slice(0, showAllBorrowRequestsToggle ? borrowRequestsData.length : 3).map((borrowRequestData) => (
                        <div key={borrowRequestData._id} className="grid-item">
                            <div className="card-buttons">
                                <button onClick={() => handleBookDetailView(borrowRequestData.bookId._id)}>
                                    <img src={viewIcon} alt="View" />
                                </button>
                                {borrowRequestData.status === 'pending' ? (
                                    <div>
                                        <button onClick={() => handleAcceptTransactionClick(borrowRequestData._id)}>
                                            <img src={checkmarkIcon} alt="Accept" />
                                        </button>
                                        <button onClick={() => handleRejectTransactionClick(borrowRequestData._id)}>
                                            <img src={removeIcon} alt="Decline" />
                                        </button>
                                    </div>
                                ) : (
                                    console.log('Transaction is not pending')
                                )}
                            </div>
                            <p><strong>Book Name:</strong> {borrowRequestData.bookId.title}</p>
                            <p><strong>Status:</strong> {borrowRequestData.status}</p>
                            <p><strong>Created At:</strong> {formatTimestamp(new Date(borrowRequestData.createdAt))}</p>
                        </div>
                    ))
                ) : (
                    <p>No requests received</p>
                )}
            </div>
            {borrowRequestsData && borrowRequestsData.length > 3 && (
                <button onClick={toggleShowAllBorrowRequests} className="toggle-button">
                    {showAllBorrowRequestsToggle ? 'Show Less' : 'Show More'}
                </button>
            )}
        </div>
    );
};

export default Profile;