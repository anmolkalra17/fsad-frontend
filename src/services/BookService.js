import axios from 'axios';

//  Base URL
const BASE_URL = 'http://localhost:8801/api/books/';

//  Add book route
const addBook = (book) => {
  const token = localStorage.getItem('token');
  return axios.post(BASE_URL + 'add/', book, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

//  Edit book route
const editBook = (id, book) => {
  const token = localStorage.getItem('token');
  return axios.put(BASE_URL + 'edit/' + id, book, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

//  Delete book route
const deleteBook = (id) => {
  const token = localStorage.getItem('token');
  return axios.delete(BASE_URL + 'delete/' + id, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

//  Get books route
const getBooks = () => {
  return axios.get(BASE_URL);
};

//  Search books route
const searchBooks = (query) => {
  return axios.get(BASE_URL + 'search', { params: query });
};

//  Get book by ID route
const getBookById = (id) => {
  return axios.get(BASE_URL + id.toString());
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