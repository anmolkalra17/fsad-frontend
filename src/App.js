import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import Home from './components/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import ForgotPassword from './components/auth/ForgotPassword';

import SearchComponent from './components/search/SearchComponent';

import BookList from './components/books/BookList';
import AddBook from './components/books/AddBook';
import EditBook from './components/books/EditBook';
import BookDetail from './components/books/BookDetail';
import TransactionList from './components/transactions/TransactionList';

import Profile from './components/Profile';

const App = () => {
  const { authToken } = localStorage.getItem('token') ?? "";

  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {authToken ? (
              <Route path="/search" element={<SearchComponent />} />
            ) : (
              <Route path="/search" element={<Login />} />
            )}
            <Route path="/books" element={<BookList />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/edit-book/:id" element={<EditBook />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/transactions" element={<TransactionList />} />

            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;