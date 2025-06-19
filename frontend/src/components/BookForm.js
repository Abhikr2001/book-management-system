import { useState } from "react";
import API from "../api";
import "../styles/Form.css";

function BookForm({ username }) {
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: ""
  });

  const handleSubmit = async () => {
    await API.post("/books", book, { params: { username } });
    setBook({ title: "", author: "", description: "" });
    window.location.reload(); // reload to update book list
  };

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          placeholder="Title"
          value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
        />
        <input
          placeholder="Author"
          value={book.author}
          onChange={(e) => setBook({ ...book, author: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={book.description}
          onChange={(e) => setBook({ ...book, description: e.target.value })}
        />
        <button onClick={handleSubmit}>Add Book</button>
      </form>
    </div>
  );
}

export default BookForm;
