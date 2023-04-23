import React from "react";

const BookDetails = ({ book, onEdit }) => {
  return (
    <div>
      <h1>Book Details</h1>
      <p>Title: {book.title}</p>
      <p>ISBN: {book.isbn}</p>
      <p>Author: {book.author}</p>
      <p>Description: {book.description}</p>
      <p>Publish Date: {book.publishDate}</p>
      <p>Publisher: {book.publisher}</p>
      <p>Genre: {book.genre}</p>
      <button onClick={onEdit}>Edit</button>
    </div>
  );
};

export default BookDetails;
