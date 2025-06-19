import { useState } from "react";
import "../styles/BookCard.css";

function BookCard({ book, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editedBook, setEditedBook] = useState({
    title: book.title,
    author: book.author,
    description: book.description
  });

  const handleSave = () => {
    onEdit(book.title, editedBook);
    setEditing(false);
  };

  return (
    <div className="book-card">
      {editing ? (
        <>
          <input
            value={editedBook.title}
            onChange={(e) => setEditedBook({ ...editedBook, title: e.target.value })}
          />
          <input
            value={editedBook.author}
            onChange={(e) => setEditedBook({ ...editedBook, author: e.target.value })}
          />
          <textarea
            value={editedBook.description}
            onChange={(e) => setEditedBook({ ...editedBook, description: e.target.value })}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{book.title}</h3>
          <p><strong>Author:</strong> {book.author}</p>
          <p>{book.description}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={() => onDelete(book.title)}>Delete</button>
        </>
      )}
    </div>
  );
}

export default BookCard;
