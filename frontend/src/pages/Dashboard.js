import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";
import "../styles/Dashboard.css";

function Dashboard({ username }) {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [viewBooks, setViewBooks] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const refreshBooks = () => {
    setRefreshFlag(!refreshFlag);
    setShowForm(false);
    setViewBooks(true);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-title">📚 Book Manager</div>
        <div className="nav-actions">
          <button onClick={() => setViewBooks(true)}>📖 View Books</button>
          <button onClick={handleLogout}>🚪 Logout</button>
        </div>
      </nav>

      {/* Main */}
      <div className="dashboard-container">
        <h1 className="welcome">👋 Welcome to Your Book Management System</h1>
<button className="add-book-button" onClick={() => setShowForm(true)}>➕</button>

        {showForm && (
          <div className="modal">
            <BookForm username={username} onBookAdded={refreshBooks} />
          </div>
        )}
        {viewBooks && <BookList username={username} refreshFlag={refreshFlag} />}
      </div>
    </>
  );
}

export default Dashboard;
