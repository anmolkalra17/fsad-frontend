import axios from 'axios';

//  Base URL
const API_URL = 'http://localhost:8801/api/books/';

//  Add book route
const addBook = (book) => {
  const token = localStorage.getItem('token');
  return axios.post(API_URL + 'add/', book, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

//  Edit book route
const editBook = (id, book) => {
  const token = localStorage.getItem('token');
  return axios.put(API_URL + 'edit/' + id, book, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

//  Delete book route
const deleteBook = (id) => {
  const token = localStorage.getItem('token');
  return axios.delete(API_URL + 'delete/' + id, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

//  Get books route
const getBooks = () => {
  return axios.get(API_URL);
};

//  Search books route
const searchBooks = (query) => {
  return axios.get(API_URL + 'search', { params: query });
};

//  Get book by ID route
const getBookById = (id) => {
  return axios.get(API_URL + id.toString());
};

//  Create Book service
const BookService = {
  addBook,
  editBook,
  deleteBook,
  getBooks,
  searchBooks,
  getBookById
};

export default BookService;