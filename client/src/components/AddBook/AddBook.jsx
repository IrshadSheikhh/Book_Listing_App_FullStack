import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './AddBook.css'

const AddBook = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [isbn, setIsbn] = useState("");
  const [description, setDescription] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [publisher, setPublisher] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = {
      id: uuidv4(),
      title,
      author,
      genre,
      isbn,
      description,
      publishDate,
      publisher
    };
    try {
     await axios.post("https://book-listing-app-backend-irshad3.onrender.com/api/books",newBook);
      //localStorage.setItem("user", JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
    //localStorage.setItem(newBook.id, JSON.stringify(newBook));
    onSubmit(newBook);
    setTitle("");
    setAuthor("");
    setGenre("");
    setIsbn("");
    setDescription("");
    setPublishDate("");
    setPublisher("");
    navigate("/home");

    
  };

  return (
    <div className="add-book-container">
      <h1 className="h1">Add a new book</h1>

     <h3 className="h3">Create new Book</h3>
  <form className="add-book-form" onSubmit={handleSubmit}>
    <label>Title:</label>
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
    />
    <label>ISBN:</label>
    <input
      type="text"
      value={isbn}
      onChange={(e) => setIsbn(e.target.value)}
      required
    />
    <label>Author:</label>
    <input
      type="text"
      value={author}
      onChange={(e) => setAuthor(e.target.value)}
      required
    />
    <label>Description:</label>
    <input
      type="text"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      required
    />
    <label>Publish Date:</label>
    <input
      type="text"
      value={publishDate}
      onChange={(e) => setPublishDate(e.target.value)}
      required
    />
    <label>Publisher:</label>
    <input
      type="text"
      value={publisher}
      onChange={(e) => setPublisher(e.target.value)}
      required
    />
    <label>Genre:</label>
    <input
      type="text"
      value={genre}
      onChange={(e) => setGenre(e.target.value)}
      required
    />
    <button type="submit">Add Book</button>
  </form>
</div>

  );
};

export default AddBook;
