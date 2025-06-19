import { useEffect, useState } from "react";
import API from "../api";
import BookCard from "./BookCard";

function BookList({ username, refreshFlag }) {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const res = await API.get(`/books/${username}`);
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, [refreshFlag]); // ✅ Refresh when flag changes

  const deleteBook = async (title) => {
    await API.delete(`/books/${title}`, { params: { username } });
    fetchBooks();
  };

  const editBook = async (title, updatedBook) => {
    await API.put(`/books/${title}`, updatedBook, { params: { username } });
    fetchBooks();
  };

  return (
    <div>
      <h2>My Books</h2>
      {books.map((book) => (
        <BookCard
          key={book.title}
          book={book}
          onDelete={deleteBook}
          onEdit={editBook}
        />
      ))}
    </div>
  );
}

export default BookList;
