import axios from 'axios';

const API_URL = 'http://localhost:8801/api/books/';

const addBook = (book) => {
  const token = localStorage.getItem('token');
  return axios.post(API_URL + 'add/', book, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const editBook = (id, book) => {
  const token = localStorage.getItem('token');
  return axios.put(API_URL + 'edit/' + id, book, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const deleteBook = (id) => {
  const token = localStorage.getItem('token');
  return axios.delete(API_URL + 'delete/' + id, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const getBooks = () => {
  return axios.get(API_URL);
};

const searchBooks = (query) => {
  return axios.get(API_URL + 'search', { params: query });
};

const getBookById = (id) => {
  return axios.get(API_URL + id.toString());
};

const BookService = {
  addBook,
  editBook,
  deleteBook,
  getBooks,
  searchBooks,
  getBookById
};

export default BookService;