import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import HomePage from "./components/Home/Home";
import AddBook from "./components/AddBook/AddBook";
import BookDetails from "./components/BookDetails/BookDetails";
import EditBook from "./components/EditBook/EditBook";

function App() {
  const [books, setBooks] = useState([]);

  const handleAddBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  const handleEditBook = (updatedBook) => {
    const updatedBooks = books.map((book) =>
      book.id === updatedBook.id ? updatedBook : book
    );
    setBooks(updatedBooks);
  };

  const handleDeleteBook = async (bookId) => {
    try {
      // Delete book from server
      await fetch(`http://localhost:5000/api/books/${bookId}`, {
        method: 'DELETE'
      });
      // Update books state by filtering out the deleted book
      const updatedBooks = books.filter((book) => book.id !== bookId);
      setBooks(updatedBooks);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route
            path="/home"
            element={<HomePage books={books} onDeleteBook={handleDeleteBook} />}
          />
          <Route
            path="/add-book"
            element={<AddBook onSubmit={handleAddBook} />}
          />
          <Route path="/books/:bookId" element={<BookDetails books={books} />} />
          <Route
            path="/edit-book/:bookId"
            element={<EditBook books={books} onEditBook={handleEditBook} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
