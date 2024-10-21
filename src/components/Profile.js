import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';
import './Profile.css';

import profilePlaceholderImg from '../profile-placeholder.jpg';

const Profile = () => {
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

                const { transactions } = response.data.transactions;
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
                            <p><strong>Transaction ID:</strong> {transaction.id}</p>
                            <p><strong>Date:</strong> {transaction.date}</p>
                            <p><strong>Amount:</strong> {transaction.amount}</p>
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