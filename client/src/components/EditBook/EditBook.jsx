import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EditBook.css";

const EditBook = () => {
  const [book, setBook] = useState({});
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const navigate = useNavigate();
  const { bookId } = useParams();

  const handleUpdateBook = async () => {
    try {
      await axios.put(`https://book-listing-app-backend-irshad3.onrender.com/api/books/${bookId}`, {
        title,
        author,
        genre,
      });
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`https://book-listing-app-backend-irshad3.onrender.com/api/books/${bookId}`);
        setBook(response.data);
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setGenre(response.data.genre);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBook();
  }, [bookId]);

  return (
    <div className="edit-book-container">
      <h1>Edit Book</h1>
      <div className="edit-book-form">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label>Genre</label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <button onClick={handleUpdateBook}>Update Book</button>
      </div>
    </div>
  );
};

export default EditBook;
