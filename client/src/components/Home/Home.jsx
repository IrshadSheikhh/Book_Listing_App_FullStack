import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const HomePage = ({ handleAddBook }) => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleAddBoo = () => {
    navigate("/add-book");
  };

  const handleEditBook = (bookId) => {
    navigate(`/edit-book/${bookId}`);
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${bookId}`);
      // Update the books state to reflect the deleted book
      setBooks(books.filter(book => book.id !== bookId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/books");
        setBooks(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="home-container">
      <div className="header">
        <h1 className="title">Book List HomePage</h1>
        <div className="buttons">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
          <button className="add-btn" onClick={handleAddBoo}>
            Add new book
          </button>
        </div>
      </div>

      {books.length === 0 && (
        <div className="default-card">
          <img
            src="https://via.placeholder.com/150x200.png?text=Book+Cover"
            alt="Book cover"
          />
          <div className="book-details">
            <h2>No books found</h2>
          </div>
        </div>
      )}

      <div className="book-list">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <img
              src="https://via.placeholder.com/150x200.png?text=Book+Cover"
              alt="Book cover"
            />
            <div className="book-details">
              <a href={`/book/${book.id}`}>
                <h2>{book.title}</h2>
              </a>
              <p>By {book.author}</p>
              <p>Genre: {book.genre}</p>
              <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
              <button onClick={() => handleEditBook(book.id)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
